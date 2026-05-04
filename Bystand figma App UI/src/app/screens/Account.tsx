import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

// Minimal icon components
const Icon = ({ path, size = 18 }: { path: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

export function Account() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+91 9999999999");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      // Security: check if new email is already in use by another user
      if (email !== "john.doe@example.com") {
        const { data: existing } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", email.trim().toLowerCase())
          .neq("id", (await supabase.auth.getUser()).data.user?.id ?? "")
          .maybeSingle();
        if (existing) {
          setError("This email is already in use by another account.");
          setSaving(false);
          return;
        }
      }
      // Security: check if new phone is already in use
      if (phone !== "+91 9999999999") {
        const { data: existingPhone } = await supabase
          .from("profiles")
          .select("id")
          .eq("phone", phone.trim())
          .neq("id", (await supabase.auth.getUser()).data.user?.id ?? "")
          .maybeSingle();
        if (existingPhone) {
          setError("This phone number is already linked to another account.");
          setSaving(false);
          return;
        }
      }
      setIsEditing(false);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const addresses = [
    { id: 1, label: "Home",   address: "123 MG Road, Bengaluru, KA 560001",  isDefault: true },
    { id: 2, label: "Office", address: "456 Residency Road, Bengaluru, KA 560025", isDefault: false },
  ];

  const paymentMethods = [
    { id: 1, type: "UPI",  details: "john@upi",   isDefault: true },
    { id: 2, type: "Card", details: "•••• 4242",  isDefault: false },
  ];

  return (
    <div className="px-4 pb-8">
      <div className="pt-5 mb-5">
        <h1 className="text-xl font-bold text-gray-900">Account</h1>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-3xl p-5 mb-4" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "var(--shadow-sm)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-900">Profile</span>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={saving}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
            style={{ color: "var(--color-primary)", background: "var(--color-primary-highlight)" }}
          >
            <Icon path={isEditing ? "M5 13l4 4L19 7" : "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"} size={13} />
            {saving ? "Saving…" : isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ background: "linear-gradient(135deg, #1d6ff3, #1045b0)" }}>
            {name.charAt(0)}
          </div>
          {isEditing ? (
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-xl bg-gray-50"
              style={{ border: "1.5px solid rgba(29,111,243,0.3)" }}
            />
          ) : (
            <p className="font-bold text-gray-900">{name}</p>
          )}
        </div>

        {error && (
          <div className="mb-4 px-3 py-2.5 rounded-xl text-xs font-medium text-red-700 bg-red-50" style={{ border: "1px solid rgba(220,38,38,0.15)" }}>
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Email</label>
            {isEditing ? (
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50"
                style={{ border: "1.5px solid rgba(29,111,243,0.25)" }}
                autoComplete="off"
              />
            ) : (
              <p className="text-sm text-gray-800">{email}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Phone</label>
            {isEditing ? (
              <input
                type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50"
                style={{ border: "1.5px solid rgba(29,111,243,0.25)" }}
              />
            ) : (
              <p className="text-sm text-gray-800">{phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-white rounded-3xl p-5 mb-4" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "var(--shadow-sm)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-900">Saved Addresses</span>
          <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
            <Icon path="M12 5v14M5 12h14" size={13} /> Add
          </button>
        </div>
        <div className="space-y-2.5">
          {addresses.map(addr => (
            <div key={addr.id} className="px-4 py-3.5 rounded-2xl"
              style={{ border: addr.isDefault ? "2px solid var(--color-primary)" : "1.5px solid rgba(0,0,0,0.07)", background: addr.isDefault ? "var(--color-primary-highlight)" : "white" }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" size={14} />
                  <span className="text-xs font-semibold text-gray-900">{addr.label}</span>
                  {addr.isDefault && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: "var(--color-primary)" }}>Default</span>}
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-blue-600"><Icon path="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" size={13} /></button>
                  <button className="text-gray-400 hover:text-red-500"><Icon path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" size={13} /></button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 ml-6">{addr.address}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods */}
      <div className="bg-white rounded-3xl p-5 mb-4" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "var(--shadow-sm)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-900">Payment Methods</span>
          <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
            <Icon path="M12 5v14M5 12h14" size={13} /> Add
          </button>
        </div>
        <div className="space-y-2.5">
          {paymentMethods.map(m => (
            <div key={m.id} className="px-4 py-3.5 rounded-2xl flex items-center justify-between"
              style={{ border: m.isDefault ? "2px solid var(--color-primary)" : "1.5px solid rgba(0,0,0,0.07)", background: m.isDefault ? "var(--color-primary-highlight)" : "white" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}>
                  <Icon path="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" size={14} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{m.type}</p>
                  <p className="text-xs text-gray-500">{m.details}</p>
                </div>
              </div>
              {m.isDefault && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: "var(--color-primary)" }}>Default</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-3xl overflow-hidden mb-4" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "var(--shadow-sm)" }}>
        {[
          { label: "Privacy Policy",       path: "/privacy" },
          { label: "Terms & Conditions",   path: "/terms" },
          { label: "Contact Us",           path: "/contact" },
        ].map((link, idx, arr) => (
          <button key={idx} onClick={() => navigate(link.path)}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            style={{ borderBottom: idx < arr.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <span className="text-sm text-gray-700">{link.label}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        ))}
      </div>

      <button onClick={() => navigate("/sign-in")}
        className="w-full py-4 rounded-2xl text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
        style={{ border: "1.5px solid rgba(239,68,68,0.18)" }}>
        Log out
      </button>
    </div>
  );
}
