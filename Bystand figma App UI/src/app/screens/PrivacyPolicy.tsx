import { useNavigate } from "react-router";
import { Shield } from "lucide-react";

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-blue-600 font-medium"
          >
            ← Back
          </button>

          <div className="text-center mb-8">
            <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: March 31, 2026</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                ByStand Healthcare Solutions ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our mobile application and services.
              </p>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Information We Collect</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">Personal Information</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Name and contact information (phone number, email address)</li>
                    <li>• Address and location data</li>
                    <li>• Payment information</li>
                    <li>• Service preferences and booking history</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">How We Use Your Information</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <ul className="space-y-2 text-gray-700">
                    <li>• To provide and maintain our services</li>
                    <li>• To process your bookings and payments</li>
                    <li>• To communicate with you about your bookings</li>
                    <li>• To improve our services and user experience</li>
                    <li>• To ensure safety and security</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Data Security</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We implement appropriate technical and organizational security measures to
                    protect your personal information against unauthorized access, alteration,
                    disclosure, or destruction.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    However, please note that no method of transmission over the Internet or
                    electronic storage is 100% secure.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Your Rights</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Access your personal data</li>
                    <li>• Correct inaccurate data</li>
                    <li>• Request deletion of your data</li>
                    <li>• Object to processing of your data</li>
                    <li>• Withdraw consent at any time</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5">
                  <p className="text-gray-700 mb-3">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-900">
                    <p><strong>Email:</strong> help.bystand@gmail.com</p>
                    <p><strong>Phone:</strong> +91 9999999999</p>
                    <p><strong>Address:</strong> MG Road, Bengaluru, Karnataka 560001</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              © 2026 ByStand Healthcare Solutions. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
