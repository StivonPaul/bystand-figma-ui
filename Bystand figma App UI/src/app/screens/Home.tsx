import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import ctaImage from "../../imports/cta-image.jpg";
import teamMember4 from "../../imports/team-member-4.jpg";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-6">
      {/* Greeting */}
      <div className="pt-5 mb-5">
        <h1 className="text-xl font-bold text-gray-900 mb-0.5">Hello, User 👋</h1>
        <p className="text-sm text-gray-500">How can we help you today?</p>
      </div>

      {/* Trust banner */}
      <div className="rounded-3xl p-5 mb-5 flex items-center gap-4"
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
          border: "1px solid rgba(29,111,243,0.12)",
        }}>
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "var(--color-primary)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-blue-600 font-medium">Trusted by</p>
          <p className="text-lg font-bold text-gray-900">100+ families</p>
        </div>
      </div>

      {/* Primary CTA */}
      <button
        onClick={() => navigate("/booking")}
        className="w-full rounded-3xl p-5 mb-5 text-white text-left transition-all hover:opacity-95 active:scale-[0.99]"
        style={{
          background: "linear-gradient(135deg, #1d6ff3 0%, #1558d0 100%)",
          boxShadow: "0 8px 32px rgba(29,111,243,0.28)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold mb-0.5">Book a ByStander</h2>
            <p className="text-sm text-blue-100">Available in 30–60 minutes</p>
          </div>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
        </div>
      </button>

      {/* Services */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">Our Services</h2>
          <button onClick={() => navigate("/app/services")} className="text-xs font-medium" style={{ color: "var(--color-primary)" }}>View all</button>
        </div>
        <div className="space-y-2.5">
          {[
            { title: "Patient Care Support", desc: "24/7 bedside assistance", image: ctaImage },
            { title: "Elderly Assistance", desc: "Compassionate care for seniors", image: teamMember4 },
          ].map((service, idx) => (
            <div key={idx} onClick={() => navigate("/booking")}
              className="bg-white rounded-2xl overflow-hidden flex cursor-pointer transition-all hover:shadow-md active:scale-[0.99]"
              style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "var(--shadow-sm)" }}>
              <ImageWithFallback src={service.image} alt={service.title} className="w-20 h-20 object-cover" />
              <div className="flex-1 p-3.5">
                <p className="font-semibold text-sm text-gray-900 mb-0.5">{service.title}</p>
                <p className="text-xs text-gray-500">{service.desc}</p>
              </div>
              <div className="flex items-center pr-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why ByStand */}
      <div className="bg-white rounded-3xl p-5" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "var(--shadow-sm)" }}>
        <h3 className="text-sm font-bold text-gray-900 mb-4">Why ByStand?</h3>
        <div className="space-y-3.5">
          {[
            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "KYC Verified", desc: "All professionals verified" },
            { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Background Checked", desc: "Thoroughly vetted for safety" },
            { icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", title: "Rated 4.8/5", desc: "Loved by our users" },
          ].map(item => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--color-primary-highlight)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
