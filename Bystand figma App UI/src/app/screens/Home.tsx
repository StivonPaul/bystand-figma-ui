import { useNavigate } from "react-router";
import { MapPin, Shield, CheckCircle, Clock, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import ctaImage from "../../imports/cta-image.jpg";
import teamMember4 from "../../imports/team-member-4.jpg";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-6">
      {/* Greeting Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Hello, User 👋</h1>
        <p className="text-gray-600">How can we help you today?</p>
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 rounded-full p-2">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Trusted by</p>
            <p className="text-xl font-bold text-gray-900">100+ families</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-2">
          Professional support when you need it most
        </p>
      </div>

      {/* Primary CTA */}
      <button
        onClick={() => navigate("/booking")}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-3xl p-6 mb-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-1">Book a ByStander</h2>
            <p className="text-blue-100">Available in 30-60 minutes</p>
          </div>
          <Clock className="w-8 h-8" />
        </div>
      </button>

      {/* Nearby Availability */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Nearby Availability</h2>
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
              <p className="font-medium text-gray-900 mb-1">Available Now</p>
              <p className="text-sm text-gray-500">2.5 km away</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Cards */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Our Services</h2>
          <button
            onClick={() => navigate("/app/services")}
            className="text-blue-600 text-sm font-medium"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "Patient Care Support",
              desc: "24/7 bedside assistance",
              image: ctaImage,
            },
            {
              title: "Elderly Assistance",
              desc: "Compassionate care for seniors",
              image: teamMember4,
            },
          ].map((service, idx) => (
            <div
              key={idx}
              onClick={() => navigate("/booking")}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex cursor-pointer hover:shadow-md transition-shadow"
            >
              <ImageWithFallback
                src={service.image}
                alt={service.title}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 p-4">
                <h3 className="font-medium text-gray-900 mb-1">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Why Choose ByStand?</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 rounded-full p-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">KYC Verified</p>
              <p className="text-sm text-gray-500">All professionals verified</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Background Checked</p>
              <p className="text-sm text-gray-500">Thoroughly vetted for safety</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join & Earn CTA */}
      <button
        onClick={() => navigate("/join-and-earn")}
        className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-4 text-center"
      >
        <p className="font-medium">Want to become a ByStander?</p>
        <p className="text-sm text-purple-100">Join & Earn with Us</p>
      </button>
    </div>
  );
}