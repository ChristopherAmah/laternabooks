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
import { API_BASE } from "../utils/api";

const getAuthToken = () => localStorage.getItem("authToken");

/* ---------------- INFO ITEM ---------------- */
const InfoItem = React.memo(
  ({ label, value, editing, name, type = "text", handleChange, icon: Icon }) => {
    const displayValue =
      value === false || value === null || value === undefined ? "" : value;

    return (
      <div className="group flex flex-col px-3 py-3 transition-all hover:bg-white/60 sm:px-4 md:flex-row md:items-center md:py-4">
        <div className="mb-2 flex w-full items-center gap-3 md:mb-0 md:w-40 md:shrink-0">
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
  <div className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 p-4 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 sm:p-6">
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition" />

    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-2">
          {label}
        </p>
        <p className="text-2xl font-bold text-gray-900 sm:text-3xl">
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
        fetch(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/dashboard`, {
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
        const rawMetrics =
          dashData.metrics || dashData.result?.data?.metrics || dashData.data?.metrics || null;

        if (rawMetrics) {
          const normalizedMetrics =
            rawMetrics.total_orders !== undefined
              ? rawMetrics
              : {
                  total_orders: rawMetrics.totalOrders ?? 0,
                  total_carts: rawMetrics.totalCarts ?? 0,
                  total_revenue: rawMetrics.totalRevenue ?? 0,
                  total_order_amount: rawMetrics.totalDue ?? 0,
                };
          setDashboard(normalizedMetrics);
        } else {
          setDashboard(null);
        }
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
      const res = await fetch(`${API_BASE}/profile`, {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto">

        {dashboard && (
          <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-12 sm:gap-6 lg:grid-cols-4">
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
          <div className="relative h-40 overflow-hidden sm:h-48 md:h-56">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400" />
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative px-4 pb-10 sm:px-6 sm:pb-16 md:px-16">
            <div className="mb-8 flex flex-col items-center gap-5 -mt-16 sm:mb-12 sm:gap-8 md:-mt-20 md:flex-row md:items-end">

              {/* Avatar */}
              <div className="relative">
                <div className="h-28 w-28 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl sm:h-32 sm:w-32 md:h-40 md:w-40 md:rounded-3xl">
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
                  <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
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
            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">

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
