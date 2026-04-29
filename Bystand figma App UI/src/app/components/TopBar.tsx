import { Menu } from "lucide-react";
import logoSvg from "../../imports/logo.svg";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div className="w-8"></div>
        <div className="flex items-center justify-center">
          <img
            src={logoSvg}
            alt="ByStand Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <div className="flex flex-col gap-1">
            <div className="w-5 h-0.5 bg-gray-800"></div>
            <div className="w-3 h-0.5 bg-gray-800 ml-auto"></div>
            <div className="w-5 h-0.5 bg-gray-800"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
