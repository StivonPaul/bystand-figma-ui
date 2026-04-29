import { useState } from "react";
import { useNavigate } from "react-router";
import { Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";

export function MyBookings() {
  const navigate = useNavigate();
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);

  const bookings = [
    {
      id: 1,
      service: "Patient Care Support",
      status: "ongoing",
      statusLabel: "Ongoing",
      statusColor: "bg-green-100 text-green-700",
      date: "March 31, 2026",
      location: "123 MG Road, Bengaluru",
      bystander: "Rajesh Kumar",
      amount: "₹800",
    },
    {
      id: 2,
      service: "Elderly Assistance",
      status: "completed",
      statusLabel: "Completed",
      statusColor: "bg-gray-100 text-gray-700",
      date: "March 25, 2026",
      location: "456 Residency Road, Bengaluru",
      bystander: "Priya Sharma",
      amount: "₹1000",
    },
    {
      id: 3,
      service: "Hospital Attendant",
      status: "requested",
      statusLabel: "Requested",
      statusColor: "bg-yellow-100 text-yellow-700",
      date: "March 20, 2026",
      location: "789 Brigade Road, Bengaluru",
      bystander: "Assigning...",
      amount: "₹1200",
    },
  ];

  const toggleBooking = (id: number) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  return (
    <div className="px-4 pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Track and manage your bookings</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {["All", "Ongoing", "Completed", "Cancelled"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
          >
            <div
              onClick={() => toggleBooking(booking.id)}
              className="p-5 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{booking.service}</h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${booking.statusColor}`}
                  >
                    {booking.statusLabel}
                  </span>
                </div>
                <button className="p-2">
                  {expandedBooking === booking.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Clock className="w-4 h-4" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{booking.location}</span>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedBooking === booking.id && (
              <div className="border-t border-gray-100 p-5 bg-gray-50">
                <div className="space-y-4">
                  {/* Timeline */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Timeline</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">Booking Placed</span>
                      </div>
                      {booking.status !== "requested" && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-gray-700">ByStander Assigned</span>
                        </div>
                      )}
                      {booking.status === "ongoing" && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-gray-700">Service Started</span>
                        </div>
                      )}
                      {booking.status === "completed" && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-gray-700">Service Completed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ByStander Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">ByStander</h4>
                    <p className="text-sm text-gray-700">{booking.bystander}</p>
                  </div>

                  {/* Receipt */}
                  <div className="bg-white rounded-2xl p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Payment</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service Charge</span>
                        <span className="text-gray-900">{booking.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="text-gray-900">₹50</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between">
                        <span className="font-medium text-gray-900">Total</span>
                        <span className="font-bold text-blue-600">
                          ₹{parseInt(booking.amount.slice(1)) + 50}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => navigate(`/booking-status/${booking.status}`)}
                    className="w-full py-3 bg-blue-600 text-white rounded-2xl font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State for no bookings */}
      {bookings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Clock className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-600 mb-6">Start by booking your first ByStander</p>
          <button
            onClick={() => navigate("/booking")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}
