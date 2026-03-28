# 🥗 FreshServe AI - Smart Food Pre-booking System

FreshServe AI is a state-of-the-art food pre-booking platform designed to ensure your meal is perfectly timed. By synchronizing travel times with kitchen preparation schedules, we guarantee that your food is served fresh and hot the moment you arrive.

![FreshServe AI](https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80)

## 🚀 Key Features

- **🧠 AI-Powered Timing**: Automatically calculates the optimal time to start cooking your meal based on your estimated arrival and the dish's preparation time.
- **⏳ Dynamic Delay Management**: Stuck in traffic? Update your delay with one click, and the kitchen schedule adjusts instantly.
- **📱 Real-time Order Tracking**: Monitor your order status from "Scheduled" to "Preparing" and finally "Ready".
- **🔐 Multi-Role Access**: Dedicated portals for both Customers and Restaurants.
- **📊 Real-time Analytics**: Simple SQLite-backed data management for orders, users, and feedback.

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS 3](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 6](https://reactrouter.com/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database**: [SQLite](https://www.sqlite.org/)
- **Asynchronous Processing**: Python's `asyncio` & `timedelta` for timing logic.

---

## 📂 Project Structure

```text
FreshServeAI/
├── backend/                # FastAPI Application
│   ├── main.py             # API endpoints and logic
│   ├── freshserve.db       # SQLite Database
│   └── requirements.txt    # Python dependencies
├── frontend/               # Vite + React Application
│   ├── client/             # Frontend source code
│   │   ├── pages/          # Spa pages (Order, Login, Tracker)
│   │   ├── components/     # Reusable UI components
│   │   └── lib/            # Utilities and constants
│   ├── public/             # Static assets
│   └── package.json        # Node dependencies
└── README.md               # You are here!
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Python 3.10+** (Backend)
- **Node.js 18+** (Frontend)
- **pnpm** (Recommended for Frontend)

### 2. Backend Setup (FastAPI)
Open a terminal in the `backend` folder:
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
> [!IMPORTANT]
> The backend MUST run on **port 8000** as the frontend is configured to point to `http://127.0.0.1:8000`.

### 3. Frontend Setup (React + Vite)
Open a new terminal in the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
*(Alternatively, use `pnpm install` and `pnpm dev` if you have pnpm installed)*

*The web app will typically be available at **`http://localhost:8080`** (or the port shown in your terminal).*

---

## 📡 API Endpoints Summary

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/place_order` | POST | Place a new smart pre-booking order |
| `/order_status` | GET | Check real-time status and confidence score |
| `/update_delay` | POST | Register a travel delay and reschedule preparation |
| `/login` / `/signup` | POST | User authentication |
| `/restaurant_login` | POST | Mock restaurant authentication |
| `/feedback` | POST | Submit user ratings and comments |

---

## 🤝 Team Member
- **MOHAMMED YUSUF**
- **JANARDHAN BE**
- **SHABBER P**
- **SHIVANAND DEVAKATE**

---

## 📜 License
This project was developed for a hackathon. All rights reserved by the "RunCommand Team".
