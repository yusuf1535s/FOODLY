from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, timedelta
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="FreshServe AI API")

# Setup CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), 'freshserve.db')

# --- Database Setup ---
def get_db_connection():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False, timeout=20)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_name TEXT,
            item_name TEXT,
            prep_time_minutes INTEGER,
            arrival_time TEXT,
            start_prep_time TEXT,
            status TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rating INTEGER,
            message TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# --- Models ---
class OrderRequest(BaseModel):
    user_name: Optional[str] = "Guest"
    food: Optional[str] = None # Support frontend using 'food'
    item_name: Optional[str] = None
    prep_time_minutes: int = 15
    arrival_time: str # Can be HH:MM or ISO

class DelayRequest(BaseModel):
    order_id: int
    additional_delay_minutes: int

class UserRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class FeedbackRequest(BaseModel):
    rating: int
    message: str

class HelpRequest(BaseModel):
    action: str  # "cancel", "delay", "contact"
    order_id: Optional[int] = None

# --- Helper Functions ---
# Already defined above in get_db_connection

# --- API Endpoints ---
@app.get("/health")
def health():
    return {"status": "ok", "db_path": DB_PATH}

@app.post("/place_order")
def place_order(order: OrderRequest):
    # Determine item name
    item = order.food or order.item_name or "Unknown Item"
    
    # Handle HH:MM arrival time format from frontend
    arrival_time_str = order.arrival_time
    if ":" in arrival_time_str and "T" not in arrival_time_str:
        # It's likely HH:MM
        now = datetime.now()
        hh, mm = map(int, arrival_time_str.split(':'))
        arrival_dt = now.replace(hour=hh, minute=mm, second=0, microsecond=0)
        # If the arrival time is earlier than now, assume it's tomorrow
        if arrival_dt < now:
            arrival_dt += timedelta(days=1)
    else:
        arrival_dt = datetime.fromisoformat(arrival_time_str.replace('Z', '+00:00'))
    
    # Calculate optimal start time: arrival - prep_time
    prep_mins = float(order.prep_time_minutes)
    start_prep_dt = arrival_dt - timedelta(minutes=prep_mins)
    
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        INSERT INTO orders (user_name, item_name, prep_time_minutes, arrival_time, start_prep_time, status)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (order.user_name, item, int(prep_mins), arrival_dt.isoformat(), start_prep_dt.isoformat(), "Scheduled"))
    
    order_id = c.lastrowid
    conn.commit()
    conn.close()
    
    return {
        "message": "Order placed successfully!",
        "order_id": order_id,
        "food": item,
        "start_time": start_prep_dt.strftime("%H:%M"),
        "arrival_time": arrival_dt.strftime("%H:%M"),
        "status": "Scheduled"
    }

@app.get("/order_status")
@app.get("/order_status/{order_id}")
def get_order_status(order_id: Optional[int] = None):
    conn = get_db_connection()
    c = conn.cursor()
    if order_id is None:
        # Get the most recent order if no ID provided
        order = c.execute('SELECT * FROM orders ORDER BY id DESC LIMIT 1').fetchone()
    else:
        order = c.execute('SELECT * FROM orders WHERE id = ?', (order_id,)).fetchone()
    conn.close()
    
    if not order:
        return {"message": "No orders found"}
        
    order_dict = dict(order)
    
    # Dynamic status update based on current time
    current_time = datetime.now()
    # Handle both ISO and naive-ish strings
    try:
        start_time = datetime.fromisoformat(order_dict['start_prep_time'])
        arrival_time = datetime.fromisoformat(order_dict['arrival_time'])
    except ValueError:
        # Fallback if needed
        return order_dict

    # Strip timezone for comparison if one has it and other doesn't
    if start_time.tzinfo and not current_time.tzinfo:
        current_time = current_time.astimezone(start_time.tzinfo)
    elif not start_time.tzinfo and current_time.tzinfo:
        current_time = current_time.replace(tzinfo=None)

    new_status = order_dict['status']
    if current_time >= arrival_time:
        new_status = "Ready"
    elif current_time >= start_time:
        new_status = "Preparing"
    else:
        new_status = "Scheduled"
        
    # Update status if changed
    if new_status != order_dict['status']:
        conn = get_db_connection()
        c = conn.cursor()
        c.execute('UPDATE orders SET status = ? WHERE id = ?', (new_status, order_dict['id']))
        conn.commit()
        conn.close()
        order_dict['status'] = new_status
        
    # Optional AI Enhancement: Confidence Score based on time gap
    confidence_score = 95
    if new_status == "Scheduled":
        time_until_prep = (start_time - current_time).total_seconds() / 60
        if time_until_prep < 5:
            confidence_score = 75
            
    order_dict['confidence_score'] = f"{confidence_score}%"
    
    # Map fields for frontend compatibility
    return {
        **order_dict,
        "food": order_dict['item_name'],
        "start_time": start_time.strftime("%H:%M"),
        "arrival_time": arrival_time.strftime("%H:%M")
    }

@app.post("/update_delay")
def update_delay(delay: Optional[DelayRequest] = None):
    conn = get_db_connection()
    c = conn.cursor()
    
    if delay and delay.order_id:
        order = c.execute('SELECT * FROM orders WHERE id = ?', (delay.order_id,)).fetchone()
        delay_mins = delay.additional_delay_minutes
    else:
        # Default to latest order and 10 mins delay (matching frontend button)
        order = c.execute('SELECT * FROM orders ORDER BY id DESC LIMIT 1').fetchone()
        delay_mins = 10
    
    if not order:
        conn.close()
        return {"message": "No active order"}
        
    if order['status'] == 'Ready':
        conn.close()
        return {"message": "Food is already ready. We will keep it warm!", "status": "Ready"}
        
    old_arrival = datetime.fromisoformat(order['arrival_time'])
    new_arrival = old_arrival + timedelta(minutes=delay_mins)
    new_start_prep = new_arrival - timedelta(minutes=order['prep_time_minutes'])
    
    c.execute('''
        UPDATE orders 
        SET arrival_time = ?, start_prep_time = ?, status = 'Delayed'
        WHERE id = ?
    ''', (new_arrival.isoformat(), new_start_prep.isoformat(), order['id']))
    
    conn.commit()
    conn.close()
    
    return {
        "message": "Delay registered. Kitchen schedule updated!",
        "food": order['item_name'],
        "arrival_time": new_arrival.strftime("%H:%M"),
        "start_time": new_start_prep.strftime("%H:%M"),
        "status": "Delayed"
    }
    
@app.get("/calculate_time")
def calculate_time(travel_mins: int, prep_mins: int):
    # Pure utility endpoint to show logic
    current = datetime.now().astimezone()
    arrival = current + timedelta(minutes=travel_mins)
    optimal_start = arrival - timedelta(minutes=prep_mins)
    return {
        "current_time": current.isoformat(),
        "travel_time_minutes": travel_mins,
        "prep_time_minutes": prep_mins,
        "estimated_arrival": arrival.isoformat(),
        "optimal_cooking_start": optimal_start.isoformat()
    }

# --- Authentication Endpoints ---
@app.post("/signup")
def signup(user: UserRequest):
    try:
        conn = get_db_connection()
        c = conn.cursor()
        c.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                  (user.name, user.email, user.password))
        conn.commit()
        conn.close()
        return {"message": "Account created successfully!"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login")
def login(creds: LoginRequest):
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("SELECT name FROM users WHERE email = ? AND password = ?", (creds.email, creds.password))
    user = c.fetchone()
    conn.close()
    if user:
        return {"message": f"Welcome back, {user['name']}!", "user_name": user['name']}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

@app.post("/restaurant_login")
def restaurant_login(creds: LoginRequest):
    # For demo purposes, any valid string works
    if not creds.email or not creds.password:
        raise HTTPException(status_code=400, detail="Email and password cannot be empty.")
    
    return {
        "message": "Restaurant login successful!", 
        "restaurant_id": creds.email,
        "token": "demo-token"
    }

# --- Feedback & Help Endpoints ---
@app.post("/feedback")
def feedback(fb: FeedbackRequest):
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("INSERT INTO feedback (rating, message) VALUES (?, ?)", (fb.rating, fb.message))
    conn.commit()
    conn.close()
    return {"message": "Thank you for your feedback!"}

@app.post("/help_action")
def help_action(req: HelpRequest):
    if req.action == "cancel":
        conn = get_db_connection()
        c = conn.cursor()
        # Cancel the latest order for demo simplicity
        c.execute("UPDATE orders SET status = 'Cancelled' WHERE id = (SELECT MAX(id) FROM orders)")
        conn.commit()
        conn.close()
        return {"message": "Order has been cancelled successfully."}
    elif req.action == "delay":
        return update_delay() # Triggers the existing delay logic
    elif req.action == "contact":
        return {"message": "Connecting to restaurant... (Simulated)"}
    else:
        raise HTTPException(status_code=400, detail="Invalid help action.")

# 1. Add Highway Data to init_db()
def seed_highway_data():
    conn = get_db_connection()
    c = conn.cursor()
    # Real Latitude/Longitude for Bengaluru-Mysore Highway stops
    highway_spots = [
        ('Renukamba Thatte Idli', 'South Indian', 12.8225, 77.3831, 'Bidadi'),
        ('Kamat Lokaruchi', 'North Karnataka', 12.7241, 77.2845, 'Ramanagara'),
        ('Maddur Tiffany\'s', 'Snacks/Vada', 12.5836, 77.0475, 'Maddur'),
        ('Empire Restaurant', 'Non-Veg/Grill', 12.6521, 77.2014, 'Channapatna'),
        ('Poojari\'s Fish Land', 'Coastal', 12.3551, 76.6852, 'Srirangapatna')
    ]
    c.executemany("INSERT INTO restaurants (name, cuisine, lat, lng, location) VALUES (?,?,?,?,?)", highway_spots)
    conn.commit()
    conn.close()

# 2. Add the Route-Aware Endpoint
@app.get("/api/restaurants/route")
def get_restaurants_on_route(s_lat: float, s_lng: float, d_lat: float, d_lng: float):
    # This logic finds restaurants inside the rectangle created by your Source and Destination
    # We add a small 'buffer' (0.05 degrees) so restaurants slightly off the main road show up
    buffer = 0.05
    min_lat, max_lat = sorted([s_lat, d_lat])
    min_lng, max_lng = sorted([s_lng, d_lng])

    conn = get_db_connection()
    c = conn.cursor()
    query = """
        SELECT * FROM restaurants 
        WHERE lat BETWEEN ? AND ? 
        AND lng BETWEEN ? AND ?
    """
    c.execute(query, (min_lat - buffer, max_lat + buffer, min_lng - buffer, max_lng + buffer))
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.get("/seed-highway")
def seed_highway():
    conn = get_db_connection()
    c = conn.cursor()
    # Delete old ones to avoid duplicates
    c.execute("DELETE FROM restaurants WHERE location IN ('Bidadi', 'Ramanagara', 'Maddur', 'Channapatna', 'Srirangapatna')")
    
    spots = [
        ('Renukamba Thatte Idli', 'South Indian', 12.8225, 77.3831, '4.5', 'Bidadi'),
        ('Kamat Lokaruchi', 'North Karnataka', 12.7241, 77.2845, '4.2', 'Ramanagara'),
        ('Maddur Tiffany\'s', 'Snacks', 12.5836, 77.0475, '4.3', 'Maddur'),
        ('Empire Restaurant', 'Non-Veg', 12.6521, 77.2014, '4.0', 'Channapatna'),
        ('Poojari\'s Fish Land', 'Seafood', 12.3551, 76.6852, '4.4', 'Srirangapatna')
    ]
    c.executemany("INSERT INTO restaurants (name, cuisine, lat, lng, rating, location) VALUES (?,?,?,?,?,?)", spots)
    conn.commit()
    conn.close()
    return {"message": "Highway restaurants added to Database!"}
