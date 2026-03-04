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
  ShoppingCart,
  Package,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import placeholderImg from "../assets/laterna.png";

const getAuthToken = () => localStorage.getItem("authToken");

/* ---------------- INFO ITEM ---------------- */
const InfoItem = React.memo(
  ({ label, value, editing, name, type = "text", handleChange, icon: Icon }) => {
    const displayValue =
      value === false || value === null || value === undefined ? "" : value;

    return (
      <div className="group flex flex-col md:flex-row md:items-center py-4 px-4 rounded-xl hover:bg-white/60 transition-all">
        <div className="flex items-center gap-3 w-40 shrink-0 mb-2 md:mb-0">
          {Icon && (
            <Icon
              size={16}
              className="text-gray-400 group-hover:text-orange-500 transition"
            />
          )}
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
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
              className="w-full bg-white/80 backdrop-blur border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          ) : (
            <span className="text-gray-900 font-medium text-sm">
              {displayValue || (
                <span className="text-gray-300 italic font-normal">
                  Not provided
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    );
  }
);

/* ---------------- STAT CARD ---------------- */
const StatCard = ({ label, value, icon: Icon }) => (
  <div className="relative overflow-hidden bg-white/80 backdrop-blur-lg p-6 rounded-2xl border border-white/50 transition-all duration-300 hover:-translate-y-1 group">
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition" />

    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-2">
          {label}
        </p>
        <p className="text-3xl font-bold text-gray-900">
          {value || 0}
        </p>
      </div>

      <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
        <Icon size={22} />
      </div>
    </div>
  </div>
);

/* ---------------- MAIN PROFILE ---------------- */
const Profile = () => {
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const syncFormData = useCallback((data) => {
    if (!data) return;
    const partner = data.partner || {};
    setFormData({
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      mobile: data.mobile || "",
      street: partner.street || "",
      city: partner.city || "",
      state: partner.state || "",
      zip: partner.zip || "",
      country: partner.country || "",
    });
  }, []);

  const fetchData = async () => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const [profileRes, dashboardRes] = await Promise.all([
        fetch("http://localhost:3001/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3001/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (profileRes.status === 401)
        throw new Error("Session expired. Please log in again.");
      if (!profileRes.ok) throw new Error("Could not fetch profile");

      const profileData = await profileRes.json();
      setUser(profileData);
      syncFormData(profileData);

      if (dashboardRes.ok) {
        const dashData = await dashboardRes.json();
        setDashboard(dashData.result?.data?.metrics || null);
      }
    } catch (err) {
      setError(err.message);
      if (err.message.includes("expired")) {
        localStorage.removeItem("authToken");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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

      if (!res.ok) throw new Error("Failed to update profile.");

      const updatedProfile = await res.json();
      setUser(updatedProfile);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-orange-200 border-t-orange-500" />
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
          <User size={40} className="mx-auto text-orange-500 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <a
            href="/login"
            className="block bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
          >
            Sign In
          </a>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {dashboard && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="Orders" value={dashboard.total_orders} icon={Package} />
            <StatCard label="Cart Items" value={dashboard.total_carts} icon={ShoppingCart} />
            <StatCard
              label="Revenue"
              value={`₦${dashboard.total_revenue?.toLocaleString()}`}
              icon={TrendingUp}
            />
            <StatCard
              label="Total Spend"
              value={`₦${dashboard.total_order_amount?.toLocaleString()}`}
              icon={CreditCard}
            />
          </div>
        )}

        <div className="backdrop-blur-xl bg-white/70 rounded-3xl border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden">

          {/* Banner */}
          <div className="h-56 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400" />
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative px-6 md:px-16 pb-16">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 mb-12 gap-8">

              {/* Avatar */}
              <div className="relative">
                <div className="w-40 h-40 rounded-3xl border-4 border-white overflow-hidden shadow-xl bg-white">
                  <img
                    src={user.image_url || placeholderImg}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="flex-1 text-center md:text-left">
                {editing ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-4xl font-bold border-b-2 border-orange-500 bg-transparent focus:outline-none"
                  />
                ) : (
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    {user.name}
                  </h2>
                )}

                <p className="text-gray-500 mt-2 flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={16} /> {user.email}
                </p>

                {/* {!editing && (
                  // <span className="inline-block mt-3 px-4 py-1 bg-gradient-to-r from-orange-500 to-amber-400 text-white text-xs font-semibold rounded-full shadow-md">
                  //   Premium Member
                  // </span>
                )} */}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {editing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition flex items-center gap-2"
                    >
                      <Save size={18} /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center gap-2"
                  >
                    <Edit2 size={18} /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            {/* Info Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              <section>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
                  Account Access
                </h3>
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm">
                  <InfoItem label="Mobile" name="mobile" value={editing ? formData.mobile : user.mobile} editing={editing} handleChange={handleChange} icon={Phone} />
                  <InfoItem label="Work Phone" name="phone" value={editing ? formData.phone : user.phone} editing={editing} handleChange={handleChange} icon={Phone} />
                  <InfoItem label="Email" name="email" value={editing ? formData.email : user.email} editing={editing} handleChange={handleChange} icon={Mail} />
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
                  Default Shipping
                </h3>
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm">
                  <InfoItem label="Street" name="street" value={editing ? formData.street : user.partner?.street} editing={editing} handleChange={handleChange} icon={MapPin} />
                  <InfoItem label="City" name="city" value={editing ? formData.city : user.partner?.city} editing={editing} handleChange={handleChange} />
                  <InfoItem label="State" name="state" value={editing ? formData.state : user.partner?.state} editing={editing} handleChange={handleChange} />
                  <InfoItem label="Zip" name="zip" value={editing ? formData.zip : user.partner?.zip} editing={editing} handleChange={handleChange} />
                  <InfoItem label="Country" name="country" value={editing ? formData.country : user.partner?.country} editing={editing} handleChange={handleChange} />
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;