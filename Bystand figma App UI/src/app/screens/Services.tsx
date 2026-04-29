import { useNavigate } from "react-router";
import { Heart, Users, Hospital, Clock, Shield, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import teamMember1 from "../../imports/team-member-1.jpg";
import teamMember2 from "../../imports/team-member-2.jpg";
import teamMember3 from "../../imports/team-member-3.jpg";

export function Services() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Patient Care Support",
      description: "24/7 bedside assistance for hospital patients",
      features: ["Medication reminders", "Mobility assistance", "Emotional support"],
      icon: Heart,
      image: teamMember1,
      price: "₹800/day",
    },
    {
      id: 2,
      title: "Elderly Assistance",
      description: "Compassionate care for senior citizens",
      features: ["Daily activities help", "Companionship", "Safety monitoring"],
      icon: Users,
      image: teamMember2,
      price: "₹1000/day",
    },
    {
      id: 3,
      title: "Hospital Companion",
      description: "Professional support during hospital stays",
      features: ["Doctor coordination", "Medical errands", "Family updates"],
      icon: Hospital,
      image: teamMember3,
      price: "₹1200/day",
    },
  ];

  return (
    <div className="px-4 pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Our Services</h1>
        <p className="text-gray-600">Choose the support you need</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Response</p>
          <p className="font-bold text-gray-900">30-60 min</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Verified</p>
          <p className="font-bold text-gray-900">100%</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Rating</p>
          <p className="font-bold text-gray-900">4.8/5</p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <p className="text-sm font-bold text-gray-900">{service.price}</p>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Includes:</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate("/booking")}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Link */}
      <button
        onClick={() => navigate("/pricing")}
        className="w-full mt-6 py-4 bg-gray-100 rounded-2xl text-gray-700 font-medium"
      >
        View Detailed Pricing
      </button>
    </div>
  );
}