import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Phone,
  MapPin,
  Mail,
  Camera,
  Save,
  X,
  Edit2,
} from "lucide-react";
import placeholderImg from "../assets/laterna.png";

// Utility
const getAuthToken = () => localStorage.getItem("authToken");

// ---------------- INFO ITEM ----------------
const InfoItem = React.memo(
  ({ label, value, editing, name, type = "text", handleChange, icon: Icon }) => {
    const displayValue =
      value === false || value === null || value === undefined ? "" : value;

    return (
      <div className="group flex flex-col md:flex-row md:items-center py-3 px-3 rounded-xl border border-transparent hover:border-gray-200 hover:bg-white transition">
        <div className="flex items-center gap-2 w-36 shrink-0 mb-1 md:mb-0">
          {Icon && <Icon size={16} className="text-gray-400" />}
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
            {label}
          </span>
        </div>

        <div className="flex-1">
          {editing ? (
            <input
              type={type}
              name={name}
              value={displayValue}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition"
            />
          ) : (
            <span className="text-gray-900 font-medium group-hover:text-gray-700 transition">
              {displayValue || (
                <span className="text-gray-300 italic">Not specified</span>
              )}
            </span>
          )}
        </div>
      </div>
    );
  }
);

// ---------------- PROFILE ----------------
const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const syncFormData = useCallback((data) => {
    const partner = data?.partner || {};
    setFormData({
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      mobile: data?.mobile || "",
      street: partner.street || "",
      city: partner.city || "",
      state: partner.state || "",
      zip: partner.zip || "",
      country: partner.country || "",
    });
  }, []);

  const fetchProfile = async () => {
    const token = getAuthToken();

    if (!token) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      const profile = await res.json();
      setUser(profile);
      syncFormData(profile);
    } catch {
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    syncFormData(user);
    setEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    const token = getAuthToken();
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      const updatedProfile = await res.json();
      setUser(updatedProfile);
      setEditing(false);
    } catch {
      setError("Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-orange-500" />
      </div>
    );
  }

  // ---------------- NOT LOGGED IN ----------------
  if (!user) {
    return (
      <div className="flex items-center justify-center px-4">
        <div className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You’re not logged in
          </h2>
          <p className="text-gray-500 mb-6">
            Please log in to view and manage your profile.
          </p>

          <a
            href="/login"
            className="inline-flex items-center justify-center bg-orange-500 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // ---------------- PROFILE UI ----------------
  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl shadow-lg shadow-orange-100/40 border border-gray-100 overflow-hidden">
        {/* Banner */}
        <div className="h-36 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_60%)]" />
        </div>

        <div className="relative px-8 pb-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-end -mt-16 mb-10 gap-6">
            <div className="relative group">
              <img
                src={
                  user.image_1920
                    ? `data:image/svg+xml;base64,${user.image_1920}`
                    : placeholderImg
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg bg-white"
              />

              {editing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition">
                  <Camera className="text-white mb-1" size={18} />
                  <span className="text-xs font-semibold text-white">
                    Change
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left pb-2">
              {editing ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 border-b-2 border-orange-500 focus:outline-none bg-transparent w-full pb-1"
                />
              ) : (
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                  {user.name}
                </h2>
              )}

              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-2 text-sm">
                <Mail size={14} /> {user.email}
              </p>
            </div>

            <div className="flex gap-3 mb-2">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition disabled:opacity-60"
                  >
                    <Save size={18} />
                    {isSaving ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition"
                  >
                    <X size={18} /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition"
                >
                  <Edit2 size={18} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact */}
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Phone size={20} className="text-orange-500" /> Contact Details
              </h3>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <InfoItem label="Phone" name="phone" value={editing ? formData.phone : user.phone} editing={editing} handleChange={handleChange} />
                <InfoItem label="Mobile" name="mobile" value={editing ? formData.mobile : user.mobile} editing={editing} handleChange={handleChange} />
                <InfoItem label="Email" name="email" value={editing ? formData.email : user.email} editing={editing} handleChange={handleChange} />
              </div>
            </section>

            {/* Address */}
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-orange-500" /> Shipping Address
              </h3>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <InfoItem label="Street" name="street" value={editing ? formData.street : user.partner?.street} editing={editing} handleChange={handleChange} />
                <InfoItem label="City" name="city" value={editing ? formData.city : user.partner?.city} editing={editing} handleChange={handleChange} />
                <InfoItem label="State" name="state" value={editing ? formData.state : user.partner?.state} editing={editing} handleChange={handleChange} />
                <InfoItem label="ZIP Code" name="zip" value={editing ? formData.zip : user.partner?.zip} editing={editing} handleChange={handleChange} />
                <InfoItem label="Country" name="country" value={editing ? formData.country : user.partner?.country} editing={editing} handleChange={handleChange} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
