import { Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { MenuDrawer } from "./MenuDrawer";

export function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <TopBar onMenuClick={() => setIsMenuOpen(true)} />
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="pt-14 pb-24 max-w-md mx-auto min-h-screen">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
