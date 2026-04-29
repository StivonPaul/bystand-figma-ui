import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User,
  MapPin,
  CreditCard,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

export function Account() {
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  const addresses = [
    {
      id: 1,
      label: "Home",
      address: "123 MG Road, Bengaluru, Karnataka 560001",
      isDefault: true,
    },
    {
      id: 2,
      label: "Office",
      address: "456 Residency Road, Bengaluru, Karnataka 560025",
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "UPI",
      details: "john@upi",
      isDefault: true,
    },
    {
      id: 2,
      type: "Card",
      details: "•••• 4242",
      isDefault: false,
    },
  ];

  return (
    <div className="px-4 pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account</h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Profile</h2>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-blue-600 text-sm font-medium flex items-center gap-1"
          >
            <Edit2 className="w-4 h-4" />
            {isEditingProfile ? "Save" : "Edit"}
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            {isEditingProfile ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-2"
              />
            ) : (
              <p className="font-bold text-gray-900 text-lg">{name}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Mobile Number
            </label>
            <p className="text-gray-900">+91 9999999999</p>
            <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email
            </label>
            {isEditingProfile ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />
            ) : (
              <p className="text-gray-900">{email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Saved Addresses</h2>
          <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 rounded-2xl border-2 ${
                addr.isDefault
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-blue-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 pl-7">{addr.address}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Payment Methods</h2>
          <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 rounded-2xl border-2 ${
                method.isDefault
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 rounded-full p-2">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{method.type}</p>
                    <p className="text-sm text-gray-600">{method.details}</p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm mb-6">
        {[
          { label: "Privacy Policy", path: "/privacy" },
          { label: "Terms & Conditions", path: "/terms" },
          { label: "Contact Us", path: "/contact" },
        ].map((link, idx) => (
          <button
            key={idx}
            onClick={() => navigate(link.path)}
            className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700">{link.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => navigate("/sign-in")}
        className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-medium"
      >
        Logout
      </button>
    </div>
  );
}
