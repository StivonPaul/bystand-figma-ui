import { Menu } from "lucide-react";
import logoWordmarkSvg from "../../imports/logo-wordmark.svg";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-black/[0.06] z-40">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        {/* Spacer left = same width as menu button so logo centres perfectly */}
        <div className="w-9 h-9" />

        {/* Logo — constrained width so full wordmark is always visible */}
        <div className="flex-1 flex items-center justify-center overflow-visible">
          <img
            src={logoWordmarkSvg}
            alt="ByStand"
            className="h-7 w-auto max-w-[120px] object-contain select-none"
            draggable={false}
          />
        </div>

        {/* Minimalist hamburger */}
        <button
          onClick={onMenuClick}
          className="w-9 h-9 flex flex-col items-end justify-center gap-[5px] hover:opacity-70 transition-opacity"
          aria-label="Open menu"
        >
          <span className="block w-5 h-[1.5px] bg-gray-800 rounded-full" />
          <span className="block w-3 h-[1.5px] bg-gray-800 rounded-full" />
          <span className="block w-5 h-[1.5px] bg-gray-800 rounded-full" />
        </button>
      </div>
    </div>
  );
}
