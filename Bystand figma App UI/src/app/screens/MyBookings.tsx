import { useState } from "react";
import { useNavigate } from "react-router";
import { useBookings } from "../contexts/BookingContext";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "requested", label: "Requested" },
  { key: "ongoing", label: "Ongoing" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  requested: { bg: "#fef9c3", text: "#a16207" },
  ongoing:   { bg: "#dcfce7", text: "#166534" },
  completed: { bg: "#f3f4f6", text: "#374151" },
  cancelled: { bg: "#fee2e2", text: "#991b1b" },
};

export function MyBookings() {
  const navigate = useNavigate();
  const { bookings } = useBookings();
  const [activeFilter, setActiveFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeFilter === "all"
    ? bookings
    : bookings.filter(b => b.status === activeFilter);

  return (
    <div className="px-4 pb-8">
      <div className="pt-5 mb-5">
        <h1 className="text-xl font-bold text-gray-900 mb-1">My Bookings</h1>
        <p className="text-sm text-gray-500">Track and manage your bookings</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className="px-3.5 py-2 rounded-full whitespace-nowrap text-xs font-semibold transition-all"
            style={{
              background: activeFilter === f.key ? "var(--color-primary)" : "rgba(0,0,0,0.05)",
              color: activeFilter === f.key ? "white" : "var(--color-text-muted)",
              boxShadow: activeFilter === f.key ? "0 2px 8px rgba(29,111,243,0.24)" : "none",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M8 2v4M16 2v4M3 10h18" />
            </svg>
          </div>
          <p className="font-semibold text-gray-700 mb-1">No {activeFilter !== "all" ? activeFilter : ""} bookings</p>
          <p className="text-sm text-gray-400 mb-6">Start by booking your first ByStander</p>
          <button
            onClick={() => navigate("/booking")}
            className="px-6 py-3 rounded-2xl text-sm font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >Book Now</button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(booking => {
            const s = STATUS_STYLE[booking.status] || STATUS_STYLE.requested;
            const isExpanded = expanded === booking.id;
            return (
              <div key={booking.id} className="bg-white rounded-3xl overflow-hidden"
                style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "var(--shadow-sm)" }}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : booking.id)}
                  className="w-full px-5 py-4 text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate mb-1.5">{booking.service}</p>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                        style={{ background: s.bg, color: s.text }}>
                        {booking.statusLabel}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">{booking.createdAt}</p>
                      <svg
                        className="ml-auto mt-2 transition-transform"
                        style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "#f8f9fb" }}>
                    <div className="pt-4 space-y-4">
                      {/* Detail rows */}
                      <div className="space-y-2">
                        {[
                          { label: "From", value: booking.fromDate ? new Date(booking.fromDate).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: true }) : "—" },
                          { label: "To",   value: booking.toDate   ? new Date(booking.toDate  ).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: true }) : "—" },
                          { label: "Address", value: booking.address },
                          { label: "ByStander", value: booking.bystander },
                        ].map(row => (
                          <div key={row.label} className="flex justify-between gap-4">
                            <span className="text-xs text-gray-400 shrink-0">{row.label}</span>
                            <span className="text-xs font-medium text-gray-800 text-right">{row.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Payment */}
                      <div className="bg-white rounded-2xl px-4 py-3" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs text-gray-500">Service Charge</span>
                          <span className="text-xs font-medium text-gray-800">{booking.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Platform Fee</span>
                          <span className="text-xs font-medium text-gray-800">₹50</span>
                        </div>
                        <div className="flex justify-between pt-2 mt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                          <span className="text-xs font-bold text-gray-900">Total</span>
                          <span className="text-xs font-bold" style={{ color: "var(--color-primary)" }}>
                            {booking.price}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/booking-status/${booking.status}`)}
                        className="w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: "var(--color-primary)" }}
                      >View Details</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
