import { useNavigate } from "react-router";
import { Check, Heart, Users, Hospital } from "lucide-react";

export function Pricing() {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      id: 1,
      name: "Patient Care Support",
      icon: Heart,
      price: "₹800",
      period: "per day",
      color: "from-blue-500 to-blue-600",
      features: [
        "24/7 bedside assistance",
        "Medication reminders",
        "Mobility assistance",
        "Emotional support",
        "Basic vitals monitoring",
      ],
    },
    {
      id: 2,
      name: "Elderly Assistance",
      icon: Users,
      price: "₹1000",
      period: "per day",
      color: "from-purple-500 to-purple-600",
      features: [
        "Daily activities help",
        "Companionship",
        "Safety monitoring",
        "Meal assistance",
        "Light housekeeping",
      ],
    },
    {
      id: 3,
      name: "Hospital Attendant",
      icon: Hospital,
      price: "₹1200",
      period: "per day",
      color: "from-green-500 to-green-600",
      features: [
        "Doctor coordination",
        "Medical errands",
        "Family updates",
        "Hospital procedures assistance",
        "Post-discharge support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-12">
        <div className="max-w-sm mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-blue-600 font-medium"
          >
            ← Back
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pricing Plans</h1>
            <p className="text-gray-600">
              Transparent pricing with no hidden charges
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-3">What's Included</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">Verified and background-checked professionals</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">24/7 customer support</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">Insurance coverage available</p>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="space-y-6">
            {pricingPlans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-white/80">{plan.period}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => navigate("/booking")}
                      className={`w-full py-3 bg-gradient-to-r ${plan.color} text-white rounded-2xl font-medium`}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Platform Fee Notice */}
          <div className="mt-6 bg-gray-50 rounded-2xl p-4">
            <p className="text-sm text-gray-600 text-center">
              * A platform fee of ₹50 applies to all bookings
            </p>
          </div>

          {/* Contact for Custom Plans */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-3">Need a custom plan?</p>
            <button
              onClick={() => navigate("/contact")}
              className="text-blue-600 font-medium"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
