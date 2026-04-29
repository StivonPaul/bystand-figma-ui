import { useNavigate } from "react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export function Contact() {
  const navigate = useNavigate();

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

          <div className="text-center mb-8">
            <img 
              src="/src/imports/Bystand_logo.png" 
              alt="ByStand Logo" 
              className="h-16 w-auto object-contain mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
            <p className="text-gray-600">
              We're here to help. Reach out to us anytime.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4 mb-8">
            <a
              href="mailto:help.bystand@gmail.com"
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-6 block hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full p-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 mb-1">Email</p>
                  <p className="text-blue-600">help.bystand@gmail.com</p>
                  <p className="text-sm text-gray-600 mt-2">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </a>

            <a
              href="tel:+919999999999"
              className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl p-6 block hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-3">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 mb-1">Phone</p>
                  <p className="text-green-600">+91 9999999999</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Available Mon-Sat, 9 AM - 6 PM
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Office Address */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 rounded-full p-3">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 mb-1">Office Address</p>
                <p className="text-gray-700">
                  ByStand Healthcare Solutions
                </p>
                <p className="text-gray-600 mt-2">
                  MG Road, Bengaluru<br />
                  Karnataka 560001<br />
                  India
                </p>
              </div>
            </div>
          </div>

          {/* Quick Message */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
              <h2 className="font-bold text-gray-900">Send us a message</h2>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Your message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl font-medium shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
