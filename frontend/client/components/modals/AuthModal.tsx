import { useState } from "react";
import { X, Mail, Lock, User, Zap } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleTab = (login: boolean) => {
    setIsLogin(login);
    setError("");
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isLogin ? "/login" : "/signup";
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          onSuccess(data.user_name);
          onClose();
        } else {
          setIsLogin(true);
          alert("Account created! Please log in.");
        }
      } else {
        setError(data.detail || "Something went wrong");
      }
    } catch (err) {
      setError("Server unreachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="relative bg-primary p-8 text-white text-center">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="inline-flex p-4 rounded-3xl bg-white/20 mb-4">
            <Zap size={32} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-black italic tracking-tighter">
            {isLogin ? "WELCOME BACK" : "JOIN FOODLY"}
          </h2>
          <p className="text-white/80 text-sm font-medium mt-1">
            {isLogin ? "Smarter food starts here" : "Deliciousness awaits you"}
          </p>
        </div>

        <div className="p-8">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
            <button
              onClick={() => toggleTab(true)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${isLogin ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
            >
              Login
            </button>
            <button
              onClick={() => toggleTab(false)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${!isLogin ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all transform active:scale-95 disabled:opacity-50"
            >
              {loading ? "PROCESSING..." : (isLogin ? "LOG IN NOW" : "CREATE ACCOUNT")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
