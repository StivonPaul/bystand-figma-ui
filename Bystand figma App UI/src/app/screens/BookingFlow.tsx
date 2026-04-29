import { useState } from "react";
import { useNavigate } from "react-router";
import { X, Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type BookingStep = "service" | "datetime" | "address" | "confirm";

export function BookingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [address, setAddress] = useState("Home - 123 MG Road, Bengaluru");

  const services = [
    { id: "patient", name: "Patient Care Support", price: "₹800/day" },
    { id: "elderly", name: "Elderly Assistance", price: "₹1000/day" },
    { id: "hospital", name: "Hospital Attendant", price: "₹1200/day" },
  ];

  const handleNext = () => {
    if (step === "service" && selectedService) setStep("datetime");
    else if (step === "datetime" && fromDate && toDate) setStep("address");
    else if (step === "address") setStep("confirm");
  };

  const handleConfirm = () => {
    navigate("/booking-status/requested");
  };

  const progress = {
    service: 25,
    datetime: 50,
    address: 75,
    confirm: 100,
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-t-3xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Book a ByStander</h2>
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress[step]}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {step === "service" && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Service</h3>
                <div className="space-y-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                        selectedService === service.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{service.price}</p>
                        </div>
                        {selectedService === service.id && (
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "datetime" && (
              <motion.div
                key="datetime"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Date & Time</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="datetime-local"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="datetime-local"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "address" && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Address</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border-2 border-blue-600 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{address}</p>
                        <p className="text-sm text-gray-500 mt-1">Default address</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 hover:border-gray-400 transition-colors">
                    + Add New Address
                  </button>
                </div>
              </motion.div>
            )}

            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Booking</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service</span>
                        <span className="font-medium text-gray-900">
                          {services.find((s) => s.id === selectedService)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium text-gray-900">1 day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium text-gray-900">Bengaluru</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-blue-600">
                          {services.find((s) => s.id === selectedService)?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <p className="text-sm text-blue-900">
                      A ByStander will be assigned within 30-60 minutes of booking confirmation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-3">
            {step !== "service" && (
              <button
                onClick={() => {
                  if (step === "datetime") setStep("service");
                  else if (step === "address") setStep("datetime");
                  else if (step === "confirm") setStep("address");
                }}
                className="px-6 py-3 border border-gray-200 rounded-2xl font-medium text-gray-700"
              >
                Back
              </button>
            )}
            <button
              onClick={step === "confirm" ? handleConfirm : handleNext}
              disabled={
                (step === "service" && !selectedService) ||
                (step === "datetime" && (!fromDate || !toDate))
              }
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === "confirm" ? "Confirm Booking" : "Continue"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
