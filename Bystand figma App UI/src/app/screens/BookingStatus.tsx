import { useNavigate, useParams } from "react-router";
import { CheckCircle, Clock, User, MapPin, Phone, X } from "lucide-react";
import { motion } from "motion/react";

export function BookingStatus() {
  const navigate = useNavigate();
  const { status } = useParams<{ status: string }>();

  const statusConfig = {
    requested: {
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      title: "Booking Requested",
      description: "We're finding the best ByStander for you",
      action: null,
    },
    assigned: {
      icon: CheckCircle,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "ByStander Assigned",
      description: "Your ByStander is on the way",
      action: "Contact ByStander",
    },
    ongoing: {
      icon: User,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Service Ongoing",
      description: "ByStander is currently providing care",
      action: "Call ByStander",
    },
    completed: {
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Service Completed",
      description: "Thank you for using ByStand",
      action: "Rate Service",
    },
    cancelled: {
      icon: X,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "Booking Cancelled",
      description: "Your booking has been cancelled",
      action: null,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.requested;
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 px-6 py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-sm mx-auto"
        >
          {/* Status Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className={`${config.iconBg} rounded-full p-6 mb-4`}>
              <Icon className={`w-16 h-16 ${config.iconColor}`} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              {config.title}
            </h1>
            <p className="text-gray-600 text-center">{config.description}</p>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Booking Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-full p-2">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium text-gray-900">Patient Care Support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-full p-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">March 31, 2026 - April 1, 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-full p-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">123 MG Road, Bengaluru</p>
                </div>
              </div>
            </div>
          </div>

          {/* ByStander Details (if assigned or ongoing) */}
          {(status === "assigned" || status === "ongoing") && (
            <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Your ByStander</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Rajesh Kumar</p>
                  <p className="text-sm text-gray-500">Experience: 5 years</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 bg-blue-600 text-white rounded-2xl font-medium flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call ByStander
              </button>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  {status !== "requested" && <div className="w-0.5 h-8 bg-gray-200"></div>}
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium text-gray-900">Booking Placed</p>
                  <p className="text-sm text-gray-500">March 31, 10:30 AM</p>
                </div>
              </div>

              {status !== "requested" && status !== "cancelled" && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      status === "assigned" || status === "ongoing" || status === "completed"
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}>
                      <CheckCircle className={`w-5 h-5 ${
                        status === "assigned" || status === "ongoing" || status === "completed"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`} />
                    </div>
                    {status !== "assigned" && <div className="w-0.5 h-8 bg-gray-200"></div>}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-gray-900">ByStander Assigned</p>
                    <p className="text-sm text-gray-500">March 31, 11:00 AM</p>
                  </div>
                </div>
              )}

              {(status === "ongoing" || status === "completed") && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      status === "ongoing" || status === "completed" ? "bg-green-100" : "bg-gray-100"
                    }`}>
                      <CheckCircle className={`w-5 h-5 ${
                        status === "ongoing" || status === "completed" ? "text-green-600" : "text-gray-400"
                      }`} />
                    </div>
                    {status !== "ongoing" && <div className="w-0.5 h-8 bg-gray-200"></div>}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-gray-900">Service Started</p>
                    <p className="text-sm text-gray-500">March 31, 12:00 PM</p>
                  </div>
                </div>
              )}

              {status === "completed" && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Service Completed</p>
                    <p className="text-sm text-gray-500">April 1, 12:00 PM</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Receipt (if completed) */}
          {status === "completed" && (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Payment Receipt</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="font-medium text-gray-900">₹800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium text-gray-900">₹50</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total Paid</span>
                  <span className="font-bold text-green-600">₹850</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="max-w-sm mx-auto space-y-3">
          {config.action && (
            <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium">
              {config.action}
            </button>
          )}
          <button
            onClick={() => navigate("/app/home")}
            className="w-full py-4 border border-gray-200 rounded-2xl font-medium text-gray-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
