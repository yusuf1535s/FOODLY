import { useState } from "react";
import { X, Star, MessageSquare, Send } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating");
    
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, message }),
      });

      if (response.ok) {
        alert("Thanks for your feedback! ❤️");
        onClose();
      }
    } catch (err) {
      alert("Failed to send feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-gray-900 p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-black tracking-tight">SHARE YOUR EXPERIENCE</h2>
          <p className="text-gray-400 text-sm mt-1">Help us make FreshServe even better</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rate your experience</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-90"
                >
                  <Star 
                    size={40} 
                    className={`${(hovered || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare size={14} />
                Your Comments
             </label>
             <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you loved..."
                rows={4}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none font-medium"
             />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Send size={20} />
            {loading ? "SENDING..." : "SUBMIT FEEDBACK"}
          </button>
        </form>
      </div>
    </div>
  );
}
