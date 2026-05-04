import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import logoWordmarkSvg from "../../imports/logo-wordmark.svg";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding-1");
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/60 to-blue-100/80 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <motion.img
          src={logoWordmarkSvg}
          alt="ByStand"
          className="h-12 w-auto max-w-[200px] object-contain select-none"
          draggable={false}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
}
