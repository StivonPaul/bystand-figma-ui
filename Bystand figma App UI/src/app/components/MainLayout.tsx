import { Outlet } from "react-router";
import { useState } from "react";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { MenuDrawer } from "./MenuDrawer";

export function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onMenuClick={() => setIsMenuOpen(true)} />
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main className="pt-20 pb-24 max-w-md mx-auto">
        <Outlet />
      </main>
      
      <BottomNav />
    </div>
  );
}
