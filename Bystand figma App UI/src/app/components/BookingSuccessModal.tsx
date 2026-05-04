import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

interface BookingSuccessModalProps {
  visible: boolean;
  onDone: () => void;
}

export function BookingSuccessModal({ visible, onDone }: BookingSuccessModalProps) {
  const navigate = useNavigate();

  const handleViewBookings = () => {
    onDone();
    navigate("/app/my-bookings");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="w-full max-w-sm rounded-3xl p-8 text-center"
            style={{
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 24px 64px rgba(29,111,243,0.22), 0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            {/* Animated tick */}
            <div className="flex items-center justify-center mb-6">
              <div className="success-icon-wrap w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "rgba(29,111,243,0.1)" }}>
                <svg width="48" height="48" viewBox="0 0 52 52" fill="none">
                  <circle
                    className="success-circle"
                    cx="26" cy="26" r="22"
                    stroke="#1d6ff3"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <polyline
                    className="success-tick"
                    points="16,27 22,33 36,19"
                    stroke="#1d6ff3"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-[22ch] mx-auto leading-relaxed">
              Your ByStander will be assigned within 30–60 minutes.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleViewBookings}
                className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "var(--color-primary)", boxShadow: "0 4px 16px rgba(29,111,243,0.28)" }}
              >
                View My Bookings
              </button>
              <button
                onClick={onDone}
                className="w-full py-3 rounded-2xl text-sm font-medium text-gray-500 hover:bg-black/[0.04] transition-colors"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
