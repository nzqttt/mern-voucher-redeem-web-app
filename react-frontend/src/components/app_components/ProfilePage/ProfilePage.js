import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import client from "../../../services/restClient";
import axiosInstance from "../../../services/axiosInstance";
import { updateUser } from "../../../models/authModel"; // Make sure this import is correct
import "./ProfilePage.css";
import axios from "axios"; 

const ProfilePage = ({ user, isLoggedIn, alert, updateUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [points, setPoints] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    phoneNumber: "",
    address: "",
    aboutMe: "",
    isActive: false,
    profileImage: "",
  });

  const fetchUserData = useCallback(async () => {
    if (!user || !isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const userData = await client.service("users").get(user._id);

      setFormData({
        email: userData.email || "",
        username: userData.username || "",
        name: userData.name || "",
        phoneNumber: userData.phoneNumber || "",
        address: userData.address || "",
        aboutMe: userData.aboutMe || "",
        isActive: userData.isActive || false,
        profileImage: userData.profileImage || "",
      });
      
      setPoints(userData.points || 0);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert({
        type: "error",
        title: "Error",
        text: "Failed to load profile data",
      });
    } finally {
      setLoading(false);
    }
  }, [user, isLoggedIn, navigate, alert]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (!user || !isLoggedIn) {
      alert({
        type: "error",
        title: "Authentication Required",
        text: "Please log in to save your profile.",
      });
      return;
    }

    try {
      setSaving(true);
      console.log("Saving user with data:", formData); // ✅ Optional debug log

      const updatedUser = await client.service("users").patch(user._id, {
        ...formData,
      });
            updateUser(updatedUser);
      
      alert({
        type: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert({
        type: "error",
        title: "Update Failed",
        text: error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
  
    const formDataData = new FormData();
    formDataData.append("profileImage", file);
    formDataData.append("userId", user._id);
  
    try {
      setUploadingImage(true);
  
      const response = await axiosInstance.post("http://localhost:3030/uploader", formDataData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // ✅ Add this log to inspect response
      console.log("Uploader response:", response.data);
  
      const imageUrl = response.data?.url;
  
      if (imageUrl) {
        // ✅ Step 2: Update both UI and DB
        setFormData((prev) => ({
          ...prev,
          profileImage: imageUrl,
        }));
  
        const updatedUser = await client.service("users").patch(user._id, {
          ...formData,
          profileImage: imageUrl, // ensure it's included
        });
  
        updateUser(updatedUser);
  
        alert({
          type: "success",
          title: "Upload Success",
          text: "Your profile image has been updated.",
        });
      } else {
        throw new Error("Uploader did not return a URL");
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert({
        type: "error",
        title: "Upload Error",
        text: err.message || "Could not upload image",
      });
    } finally {
      setUploadingImage(false);
    }
  };
  
  
  
  const getInitials = () => {
    const names = (formData.name || formData.username).split(" ");
    return names
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="profile-page-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-form-section">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>About Me</label>
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleInputChange}
              placeholder="Tell us about yourself"
              rows="4"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              Active Account
            </label>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="save-button"
          >
            {saving ? (
              <>
                <span className="spinner"></span> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>

        <div className="profile-sidebar">
          <div className="avatar-section">
            <div
              className={`avatar-container ${uploadingImage ? "uploading" : ""}`}
              style={{
                backgroundImage: user.profileImage
                ? `url(http://localhost:3030${user.profileImage})` // ✅ FULL URL
                : "none",
          

              }}
            >
              {!user.profileImage && (
                <span className="avatar-initials">{getInitials()}</span>
              )}
              {uploadingImage && (
                <div className="upload-overlay">
                  <div className="upload-spinner"></div>
                </div>
              )}
            </div>

            <div className="avatar-upload">
              <input
                type="file"
                id="profile-image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
              <label htmlFor="profile-image-upload">
                {uploadingImage ? "Uploading..." : "Change Profile Photo"}
              </label>
            </div>
          </div>

          <div className="points-display">
            <h3>Your Points</h3>
            <div className="points-value">{points.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  updateUser: (data) => dispatch.auth.update({ user: data }), // ✅ use the Rematch `auth` model
});


export default connect(mapState, mapDispatch)(ProfilePage);