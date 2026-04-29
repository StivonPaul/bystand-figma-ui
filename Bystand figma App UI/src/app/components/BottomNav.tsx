import { Home, Briefcase, Calendar, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/app/home" },
    { icon: Briefcase, label: "Services", path: "/app/services" },
    { icon: Calendar, label: "My Bookings", path: "/app/my-bookings" },
    { icon: User, label: "Account", path: "/app/account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all"
            >
              <Icon 
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              />
              <span 
                className={`text-xs transition-colors ${
                  isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
