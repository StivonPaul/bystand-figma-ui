import { useNavigate, useLocation } from "react-router";

// Minimal SVG icon set — clean, single-weight strokes
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const ServicesIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-4 0v2" />
    <path d="M8 7V5a2 2 0 014 0" />
  </svg>
);

const BookingsIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M8 2v4M16 2v4M3 10h18" />
    <path d="M8 14h4M8 18h6" />
  </svg>
);

const AccountIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { component: HomeIcon, label: "Home", path: "/app/home" },
    { component: ServicesIcon, label: "Services", path: "/app/services" },
    { component: BookingsIcon, label: "Bookings", path: "/app/my-bookings" },
    { component: AccountIcon, label: "Account", path: "/app/account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-black/[0.06] z-40">
      <div className="max-w-md mx-auto px-2 pb-safe flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComp = item.component;
          return (
            <button
              key={item.path}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "instant" });
                navigate(item.path);
              }}
              className={`flex flex-col items-center gap-0.5 py-2.5 px-4 rounded-xl transition-all ${
                isActive ? "text-[var(--color-primary)]" : "text-gray-400"
              }`}
            >
              <IconComp active={isActive} />
              <span className={`text-[10px] leading-none font-medium ${
                isActive ? "text-[var(--color-primary)]" : "text-gray-400"
              }`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
