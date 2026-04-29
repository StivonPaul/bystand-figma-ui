import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import teamMember2 from "../../imports/team-member-2.jpg";

export function Onboarding2() {
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
              src={teamMember2}
              alt="Verified bystander care"
              className="w-full h-80 object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Verified and background-checked professionals
          </h1>
          
          <p className="text-gray-600 text-center text-lg">
            Every bystander is thoroughly vetted for your safety and peace of mind
          </p>
        </motion.div>
      </div>

      <div className="px-6 pb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1.5 bg-blue-600 rounded-full"></div>
          <div className="w-2 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/sign-in")}
            className="flex-1 py-3 text-gray-600 font-medium"
          >
            Skip
          </button>
          <button
            onClick={() => navigate("/onboarding-3")}
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium shadow-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}