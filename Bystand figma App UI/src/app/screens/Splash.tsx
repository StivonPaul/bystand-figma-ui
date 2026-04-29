import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import logoSvg from "../../imports/logo.svg";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding-1");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-200 dark:from-gray-900 dark:via-blue-950 dark:to-blue-900 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl dark:bg-white/5">
          <img
            src={logoSvg}
            alt="ByStand Logo"
            className="h-24 w-auto object-contain dark:brightness-110"
          />
        </div>
      </motion.div>
    </div>
  );
}
