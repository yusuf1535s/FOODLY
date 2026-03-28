import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, User, Menu, X, MessageSquare, HelpCircle, Store } from "lucide-react";
import AuthModal from "./modals/AuthModal";
import FeedbackModal from "./modals/FeedbackModal";
import HelpModal from "./modals/HelpModal";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));
  const [search, setSearch] = useState("");

  const handleAuthSuccess = (name: string) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  const handleLogout = () => {
    setUserName(null);
    localStorage.removeItem("userName");
    window.location.reload();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    if (onSearch) onSearch(query);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-600 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-2xl font-bold text-primary">foodly</div>
          </Link>

          {/* Location + Search - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 gap-4 max-w-2xl">
            {/* Location Input */}
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <MapPin size={18} className="text-gray-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Enter delivery address"
                className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-500 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search for restaurants or dishes"
                className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Account Links */}
          <div className="hidden lg:flex items-center gap-5">
            <Link to="/pre-book" className="flex justify-center items-center px-4 py-2 bg-primary text-white text-sm font-bold rounded-full shadow hover:bg-primary/90 transition-all">
              ⚡ FreshServe AI
            </Link>
            
            <button 
              onClick={() => setIsFeedbackOpen(true)}
              className="text-gray-600 hover:text-primary flex items-center gap-1.5 font-bold text-xs uppercase tracking-tighter"
            >
              <MessageSquare size={16} />
              Feedback
            </button>

            <button 
              onClick={() => setIsHelpOpen(true)}
              className="text-gray-600 hover:text-primary flex items-center gap-1.5 font-bold text-xs uppercase tracking-tighter"
            >
              <HelpCircle size={16} />
              Help
            </button>

            <Link 
              to="/restaurant-login"
              className="text-gray-600 hover:text-primary flex items-center gap-1.5 font-bold text-xs uppercase tracking-tighter"
            >
              <Store size={16} />
              Partner Login
            </Link>

            <button 
              onClick={() => !userName && setIsAuthOpen(true)}
              className="text-gray-700 hover:text-primary font-bold text-sm flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 transition-all"
            >
              <User size={18} className={userName ? "text-primary" : ""} />
              {userName ? userName : "Sign In"}
            </button>

            {userName && (
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 font-bold text-sm flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-red-100 transition-all"
                title="Logout"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile: Search icon */}
          <button className="lg:hidden text-gray-600 hover:text-primary">
            <Search size={20} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="space-y-3">
               <button 
                onClick={() => { if (!userName) { setIsAuthOpen(true); setIsMenuOpen(false); } }}
                className="w-full text-primary font-bold py-3 border border-primary rounded-xl hover:bg-red-50"
              >
                {userName ? userName : "Sign In"}
              </button>

              {userName && (
                <button 
                  onClick={handleLogout}
                  className="w-full text-red-500 font-bold py-3 border border-red-500 rounded-xl hover:bg-red-50"
                >
                  Logout
                </button>
              )}
              <button 
                onClick={() => { setIsFeedbackOpen(true); setIsMenuOpen(false); }}
                className="w-full text-gray-700 font-bold py-3 bg-gray-100 rounded-xl"
              >
                Share Feedback
              </button>

              <Link 
                to="/restaurant-login"
                className="w-full block text-center text-gray-700 font-bold py-3 bg-gray-100 rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurant Partner Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={handleAuthSuccess} 
      />
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />
    </header>
  );
}
