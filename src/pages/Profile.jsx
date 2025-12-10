import React, { useState, useEffect } from "react";
import placeholderImg from "../assets/laterna.png"; // Fallback image

// Utility function to retrieve the stored token
const getAuthToken = () => localStorage.getItem("authToken");

// --- Modular Info Item Component ---
const InfoItem = ({ label, value, editing, name, type = "text", handleChange }) => {
  const displayValue = value === false ? "" : value; // Handle false values

  return (
    <div className="flex items-center p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-150">
      <div className="text-orange-500 w-6 h-6 flex-shrink-0 mr-4">
        <span role="img" aria-label={label.toLowerCase() + " icon"}>
          📍
        </span>
      </div>
      <span className="font-medium text-gray-700 w-24 flex-shrink-0">{label}:</span>
      {editing ? (
        <input
          type={type}
          name={name}
          value={displayValue || ""}
          onChange={handleChange}
          className="flex-1 border-b-2 border-gray-200 focus:border-orange-500 outline-none text-right placeholder-gray-400 p-1 bg-transparent transition duration-200"
          placeholder={`Enter ${label}`}
        />
      ) : (
        <span className="text-gray-900 text-right flex-1 break-words">
          {displayValue || "Not set"}
        </span>
      )}
    </div>
  );
};

// --- Main Profile Component ---
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch profile via your Express proxy
  const fetchProfile = async () => {
    const token = getAuthToken();
    if (!token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) setError("Session expired. Please log in again.");
        else throw new Error(`HTTP error! status: ${response.status}`);
        return;
      }

      const data = await response.json();
      setUser(data);

      // Initialize formData for editing
      const partner = data.partner || {};
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        mobile: data.mobile || "",
        street: partner.street || "",
        street2: partner.street2 || "",
        city: partner.city || "",
        state: partner.state || "",
        country: partner.country || "",
        zip: partner.zip || "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile. Check API connection.");
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

  const handleSave = async () => {
    setLoading(true);
    const token = getAuthToken();
    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      mobile: formData.mobile,
      partner: {
        street: formData.street,
        street2: formData.street2,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zip: formData.zip,
      },
    };

    try {
      const response = await fetch("http://localhost:3001/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const updatedData = await response.json();
      setUser(updatedData);
      setEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile changes.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;
    const partner = user.partner || {};
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      mobile: user.mobile || "",
      street: partner.street || "",
      street2: partner.street2 || "",
      city: partner.city || "",
      state: partner.state || "",
      country: partner.country || "",
      zip: partner.zip || "",
    });
    setEditing(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        ⏳ Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl font-semibold">
        ❌ {error}
      </div>
    );

  return (
    <div className="max-w-xl mx-auto my-10 bg-white shadow-2xl rounded-xl overflow-hidden">
      <div className="p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user?.image_1920 ? `data:image/svg+xml;base64,${user.image_1920}` : placeholderImg}
            alt={user?.name || "User"}
            className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-lg mb-4"
          />
          <div className="text-center">
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-2xl font-bold border-b-2 border-gray-300 focus:border-orange-500 outline-none text-center w-full"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">{user?.name || "Name not set"}</h2>
            )}
            {editing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-gray-600 border-b-2 border-gray-300 focus:border-orange-500 outline-none text-center w-full mt-1"
              />
            ) : (
              <p className="text-gray-600">{user?.email || "Email not set"}</p>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">📞 Contact Details</h3>
          <div className="space-y-1">
            <InfoItem label="Phone" value={editing ? formData.phone : user?.phone} editing={editing} name="phone" type="tel" handleChange={handleChange} />
            <InfoItem label="Mobile" value={editing ? formData.mobile : user?.mobile} editing={editing} name="mobile" type="tel" handleChange={handleChange} />
          </div>
        </div>

        {/* Address */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">🗺️ Address</h3>
          <div className="space-y-1">
            {["street", "street2", "city", "state", "zip", "country"].map((field) => (
              <InfoItem
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={editing ? formData[field] : user?.partner?.[field]}
                editing={editing}
                name={field}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center p-4 bg-gray-100 border-t space-x-4">
        {editing ? (
          <>
            <button onClick={handleSave} className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition shadow-md" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={handleCancel} className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 py-2 rounded-lg transition" disabled={loading}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)} className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition shadow-md">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
