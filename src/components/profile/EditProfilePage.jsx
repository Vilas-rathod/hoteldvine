import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "./EditProfilePage.css";

const EditProfileCard = () => {
  const [user, setUser] = useState({
    id: null, // 🛠️ FIXED: Initialize id properly
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await ApiService.getUserProfile();
        if (response.user) {
          setUser({
            id: response.user.id || null, // 🛠️ FIXED: Ensure user.id is assigned
            name: response.user.name || "",
            email: response.user.email || "",
            phoneNumber: response.user.phoneNumber || "",
            password: "",
          });
        } else {
          setError("User profile not found.");
        }
      } catch (err) {
        setError(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user.id) {
      setError("User ID is missing. Cannot update profile.");
      setLoading(false);
      return;
    }

    try {
      await ApiService.editProfile(user.id, user);
      alert("Profile updated successfully!"); // Replace with toast in production
      navigate(-1);
    } catch (err) {
      setError(err.message || "Profile update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    setLoading(true);
    setError(null);

    if (!user.id) {
      setError("User ID is missing. Cannot delete profile.");
      setLoading(false);
      return;
    }

    try {
      await ApiService.deleteUser(user.id);
      navigate("/signup", { replace: true });
    } catch (err) {
      setError(err.message || "Account deletion failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="edit-profile-card">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading...</p>}
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            disabled={loading}
          />
        </label>
        <label>
          Email
          <input type="email" name="email" value={user.email} disabled />
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone"
            disabled={loading}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="New Password"
            disabled={loading}
          />
        </label>
        <div className="action-buttons">
          <button type="button" className="btn btn-back" onClick={handleBack} disabled={loading}>
            Back
          </button>
          <button type="submit" className="btn btn-update" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button" className="btn btn-delete" onClick={handleDelete} disabled={loading}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileCard;
