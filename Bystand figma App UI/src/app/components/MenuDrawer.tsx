import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Join as ByStander", path: "/join-and-earn", highlight: true },
    { label: "Contact Us", path: "/contact" },
    { label: "Account", path: "/app/account" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.path) navigate(item.path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 w-[58%] max-w-[240px] bg-white/90 backdrop-blur-xl shadow-2xl z-50 flex flex-col"
            style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="h-14 flex items-center justify-end px-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/[0.04] transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <nav className="flex-1 py-3 overflow-y-auto">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`w-full px-5 py-3.5 text-left text-sm transition-colors ${
                    item.highlight
                      ? "text-[var(--color-primary)] font-semibold hover:bg-[var(--color-primary-highlight)]"
                      : "text-gray-700 hover:bg-black/[0.03]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
