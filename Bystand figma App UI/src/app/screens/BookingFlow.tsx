import { useState } from "react";
import { useNavigate } from "react-router";
import { X, MapPin, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LiquidDateTimePicker } from "../components/LiquidDateTimePicker";
import { BookingSuccessModal } from "../components/BookingSuccessModal";
import { useBookings } from "../contexts/BookingContext";

type BookingStep = "service" | "datetime" | "address" | "confirm";

function formatDT(val: string) {
  if (!val) return "";
  const d = new Date(val);
  return d.toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

export function BookingFlow() {
  const navigate = useNavigate();
  const { addBooking } = useBookings();

  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [address, setAddress] = useState("Home — 123 MG Road, Bengaluru");
  const [activePicker, setActivePicker] = useState<null | "from" | "to">(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const services = [
    { id: "patient", name: "Patient Care Support", price: "₹800/day", desc: "Bedside & daily care" },
    { id: "elderly", name: "Elderly Assistance", price: "₹1000/day", desc: "Compassionate senior support" },
    { id: "hospital", name: "Hospital Attendant", price: "₹1200/day", desc: "In-hospital assistance" },
  ];

  const selectedSvc = services.find(s => s.id === selectedService);

  const handleNext = () => {
    if (step === "service" && selectedService) setStep("datetime");
    else if (step === "datetime" && fromDate && toDate) setStep("address");
    else if (step === "address") setStep("confirm");
  };

  const handleConfirm = () => {
    addBooking({
      service: selectedSvc?.name || "",
      serviceId: selectedService,
      price: selectedSvc?.price || "",
      fromDate,
      toDate,
      address,
      status: "requested",
      statusLabel: "Requested",
      bystander: "Assigning...",
    });
    setShowSuccess(true);
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    navigate("/app/home");
  };

  const progress = { service: 25, datetime: 50, address: 75, confirm: 100 };

  const DateFieldButton = ({ which }: { which: "from" | "to" }) => {
    const val = which === "from" ? fromDate : toDate;
    const label = which === "from" ? "From" : "To";
    return (
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{label}</label>
        <button
          onClick={() => setActivePicker(which)}
          className="w-full px-4 py-3.5 rounded-2xl text-sm text-left transition-all"
          style={{
            background: "rgba(255,255,255,0.88)",
            border: "1px solid rgba(29,111,243,0.18)",
            backdropFilter: "blur(16px)",
            color: val ? "var(--color-text)" : "var(--color-text-faint)",
            boxShadow: activePicker === which ? "0 0 0 2px rgba(29,111,243,0.3)" : "none",
          }}
        >
          {val ? formatDT(val) : `Select ${label.toLowerCase()} date & time`}
        </button>
        <AnimatePresence>
          {activePicker === which && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="mt-2"
            >
              <LiquidDateTimePicker
                label={label}
                value={val}
                onChange={v => {
                  if (which === "from") setFromDate(v);
                  else setToDate(v);
                }}
                onClose={() => setActivePicker(null)}
                minDate={which === "to" ? fromDate : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <BookingSuccessModal visible={showSuccess} onDone={handleSuccessDone} />

      <div className="fixed inset-0 z-50 flex items-end"
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="w-full max-h-[92vh] flex flex-col rounded-t-3xl overflow-hidden"
          style={{ background: "#f8f9fb" }}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-4 bg-white" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Book a ByStander</h2>
              <button
                onClick={() => navigate(-1)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.05] transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--color-primary)" }}
                animate={{ width: `${progress[step]}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <AnimatePresence mode="wait">
              {step === "service" && (
                <motion.div key="service"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-base font-bold text-gray-900 mb-4">Select Service</h3>
                  <div className="space-y-2.5">
                    {services.map(svc => (
                      <button
                        key={svc.id}
                        onClick={() => setSelectedService(svc.id)}
                        className="w-full px-4 py-4 rounded-2xl text-left transition-all"
                        style={{
                          border: selectedService === svc.id ? "2px solid var(--color-primary)" : "1.5px solid rgba(0,0,0,0.08)",
                          background: selectedService === svc.id ? "var(--color-primary-highlight)" : "white",
                          boxShadow: selectedService === svc.id ? "0 4px 16px rgba(29,111,243,0.12)" : "none",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{svc.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{svc.desc}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{svc.price}</p>
                            {selectedService === svc.id && (
                              <div className="w-4 h-4 rounded-full mt-1 ml-auto flex items-center justify-center"
                                style={{ background: "var(--color-primary)" }}>
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="white"><path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "datetime" && (
                <motion.div key="datetime"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-base font-bold text-gray-900 mb-4">Select Date &amp; Time</h3>
                  <div className="space-y-4">
                    <DateFieldButton which="from" />
                    <DateFieldButton which="to" />
                  </div>
                </motion.div>
              )}

              {step === "address" && (
                <motion.div key="address"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-base font-bold text-gray-900 mb-4">Select Address</h3>
                  <div className="space-y-2.5">
                    <div className="px-4 py-4 rounded-2xl"
                      style={{ border: "2px solid var(--color-primary)", background: "var(--color-primary-highlight)" }}>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-0.5" style={{ color: "var(--color-primary)" }} />
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{address}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Default address</p>
                        </div>
                        <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: "var(--color-primary)" }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="white"><path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                    <button className="w-full px-4 py-4 rounded-2xl text-sm text-gray-500 flex items-center gap-2"
                      style={{ border: "1.5px dashed rgba(0,0,0,0.14)" }}>
                      <span className="text-base leading-none">+</span> Add new address
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "confirm" && (
                <motion.div key="confirm"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-base font-bold text-gray-900 mb-4">Review & Confirm</h3>
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid rgba(0,0,0,0.07)" }}>
                    {[
                      { label: "Service", value: selectedSvc?.name },
                      { label: "From", value: formatDT(fromDate) },
                      { label: "To", value: formatDT(toDate) },
                      { label: "Location", value: address },
                    ].map((row, i, arr) => (
                      <div key={row.label} className="px-4 py-3.5 flex justify-between gap-4 bg-white"
                        style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                        <span className="text-xs text-gray-500 shrink-0">{row.label}</span>
                        <span className="text-xs font-semibold text-gray-900 text-right">{row.value}</span>
                      </div>
                    ))}
                    <div className="px-4 py-3.5 flex justify-between bg-[var(--color-primary-highlight)]"
                      style={{ borderTop: "1.5px solid var(--color-primary)" }}>
                      <span className="text-sm font-bold text-gray-900">Total</span>
                      <span className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{selectedSvc?.price}</span>
                    </div>
                  </div>
                  <div className="mt-3 px-4 py-3 rounded-2xl text-xs text-blue-700 bg-blue-50">
                    A ByStander will be assigned within 30–60 minutes.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 bg-white" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex gap-2.5">
              {step !== "service" && (
                <button
                  onClick={() => {
                    if (step === "datetime") setStep("service");
                    else if (step === "address") setStep("datetime");
                    else if (step === "confirm") setStep("address");
                  }}
                  className="px-5 py-3.5 rounded-2xl text-sm font-semibold text-gray-600 transition-colors hover:bg-black/[0.04]"
                  style={{ border: "1.5px solid rgba(0,0,0,0.1)" }}
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
                className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "var(--color-primary)", boxShadow: "0 4px 16px rgba(29,111,243,0.28)" }}
              >
                {step === "confirm" ? "Confirm Booking" : "Continue"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
