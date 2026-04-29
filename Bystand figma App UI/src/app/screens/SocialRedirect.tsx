import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import teamMember4 from "../../imports/team-member-4.jpg";

export function SocialRedirect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 font-medium"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="mb-6 rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={teamMember4}
              alt="ByStand Team"
              className="w-full h-64 object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Socials Coming Soon
          </h1>
          
          <p className="text-gray-600 mb-8">
            We're working on connecting with you on social media. Stay tuned for updates!
          </p>

          <div className="flex gap-3 justify-center mb-6">
            {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
              <div
                key={social}
                className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <span className="text-gray-400 text-xs uppercase">{social[0]}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/app/home")}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}