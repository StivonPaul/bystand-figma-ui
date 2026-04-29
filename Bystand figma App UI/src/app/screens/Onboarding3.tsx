import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import teamMember3 from "../../imports/team-member-3.jpg";

export function Onboarding3() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 rounded-3xl overflow-hidden shadow-lg">
            <ImageWithFallback
              src={teamMember3}
              alt="Home and hospital support"
              className="w-full h-80 object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Support for patients and families
          </h1>
          
          <p className="text-gray-600 text-center text-lg">
            Compassionate care for hospital visits, home care, and recovery support
          </p>
        </motion.div>
      </div>

      <div className="px-6 pb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1.5 bg-blue-600 rounded-full"></div>
        </div>

        <button
          onClick={() => navigate("/sign-in")}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}