import { X, AlertCircle, Ban, PhoneCall, ArrowRight } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  const handleAction = async (action: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/help_action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      alert(data.message);
      if (action === "cancel") {
        window.location.reload(); // Refresh to show cancelled state for demo
      }
      onClose();
    } catch (err) {
      alert("Request failed");
    }
  };

  const HELP_OPTIONS = [
    {
      id: "delay",
      title: "I'm Running Late",
      desc: "Add 10 mins to your sync time",
      icon: AlertCircle,
      color: "bg-orange-50 text-orange-600",
      action: () => handleAction("delay")
    },
    {
      id: "cancel",
      title: "Cancel Pre-Booking",
      desc: "Stop preparation immediately",
      icon: Ban,
      color: "bg-red-50 text-red-600",
      action: () => handleAction("cancel")
    },
    {
      id: "contact",
      title: "Contact Restaurant",
      desc: "Talk to the kitchen team",
      icon: PhoneCall,
      color: "bg-blue-50 text-blue-600",
      action: () => handleAction("contact")
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black tracking-tight">SUPPORT CENTER</h2>
            <p className="text-gray-400 text-sm font-medium">How can we help you today?</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {HELP_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={opt.action}
              className="w-full p-6 rounded-3xl border border-gray-100 hover:border-primary/20 hover:bg-gray-50 transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${opt.color}`}>
                   <opt.icon size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{opt.title}</h4>
                  <p className="text-gray-500 text-xs font-medium">{opt.desc}</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>

        <div className="p-8 bg-gray-50 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Available 24/7 for FreshSync support
            </p>
        </div>
      </div>
    </div>
  );
}
