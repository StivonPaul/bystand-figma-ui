import { useNavigate } from "react-router";
import { FileText } from "lucide-react";

export function TermsAndConditions() {
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
            <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
            <p className="text-gray-600">Last updated: March 31, 2026</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using ByStand Healthcare Solutions ("ByStand," "we," "our," or "us"),
                you agree to be bound by these Terms and Conditions. If you disagree with any part
                of these terms, you may not access our services.
              </p>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Service Description</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    ByStand provides a platform connecting users with trained and verified bystanders
                    for in-person healthcare support services including:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Patient care support</li>
                    <li>• Elderly assistance</li>
                    <li>• Hospital attendant services</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <strong>Important:</strong> ByStand does NOT provide medical consultations,
                    telemedicine services, or prescriptions. Our bystanders are not medical doctors.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">User Responsibilities</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Provide accurate and complete information</li>
                    <li>• Maintain the confidentiality of your account</li>
                    <li>• Use the service lawfully and respectfully</li>
                    <li>• Pay for services as agreed</li>
                    <li>• Treat bystanders with respect and dignity</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Booking and Cancellation</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Booking:</strong> All bookings are subject to availability. We strive
                    to assign a bystander within 30-60 minutes of booking confirmation.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Cancellation:</strong> Cancellations made 24 hours before the scheduled
                    service are eligible for a full refund. Cancellations made within 24 hours may
                    incur a cancellation fee.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Payment Terms</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <ul className="space-y-2 text-gray-700">
                    <li>• All prices are in Indian Rupees (INR)</li>
                    <li>• Payment is required at the time of booking</li>
                    <li>• A platform fee of ₹50 applies to all bookings</li>
                    <li>• We accept UPI, credit/debit cards, and other digital payment methods</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    ByStand acts as a platform connecting users with bystanders. While we verify
                    and background-check all bystanders, we are not liable for:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Medical outcomes or decisions</li>
                    <li>• Actions or omissions of bystanders</li>
                    <li>• Loss or damage to personal property</li>
                    <li>• Indirect or consequential damages</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Governing Law</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <p className="text-gray-700 leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws
                    of India. Any disputes shall be subject to the exclusive jurisdiction of
                    the courts in Bengaluru, Karnataka.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Information</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5">
                  <p className="text-gray-700 mb-3">
                    For questions about these Terms and Conditions, please contact:
                  </p>
                  <div className="space-y-2 text-gray-900">
                    <p><strong>ByStand Healthcare Solutions</strong></p>
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
