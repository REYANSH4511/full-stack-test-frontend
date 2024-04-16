import React, { useEffect, useState } from "react";
import "./style.css";
import ContactDeatils from "./contactDetails";
import axios from "axios";
import { allApi } from "../api";
const PersonalDeatils = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    email: "",
    phoneNumber: "",
  });
  const userAgent = navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isTablet =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isDesktop =
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const browserInfo = {
    isChrome: /Chrome/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent),
    isSafari: /Safari/.test(userAgent),
  };
  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIpAddress(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };
  useEffect(() => {
    fetchIpAddress();
    const deviceInfo = {
      userAgent,
      deviceType: isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop",
      browserName: browserInfo.isChrome
        ? "CHROME"
        : browserInfo.isFirefox
        ? "FIREFOX"
        : browserInfo.isSafari
        ? "SAFARI"
        : "UNKNOWN",
      ipAddress: ipAddress,
    };
    allApi
      .saveBrowserDetails(deviceInfo)
      .then((res) => {
        // alert(res.message);
      })
      .catch((err) => {
        // alert(err?.message);
      });
  }, [fetchIpAddress]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      if (/^[a-zA-Z]*$/.test(value) || value === "") {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === "day" || name === "month" || name === "year") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
    } else {
      setIsSubmitting(false);
    }
  };
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!formData.day) {
      errors.day = "Day is required";
    }
    if (!formData.month) {
      errors.month = "Month is required";
    }
    if (!formData.year) {
      errors.year = "Year is required";
    }

    return errors;
  };
  return (
    <>
      {!isSubmitting ? (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="head">Enter Your Personal Deatils</div>
            <label for="firstName">First Name</label>
            <input
              className="inputField"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="error-commom">{errors.firstName}</span>
            )}
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              className="inputField"
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="error-commom">{errors.lastName}</span>
            )}
          </div>
          <div class="form-group dob-p1-main">
            <div>Enter Your Date Of Birth:</div>
            <div className="dob-p1">
              <div className="dob-h1">
                <span className="dob-span-title">Date of Birth</span>
              </div>
              <div className="dob">
                <input
                  name="day"
                  value={formData.date}
                  type="number"
                  placeholder="Day"
                  onChange={handleChange}
                  className="dob-input"
                />
                <input
                  name="month"
                  value={formData.month}
                  type="number"
                  placeholder="Month"
                  onChange={handleChange}
                  className="dob-input"
                />
                <input
                  name="year"
                  value={formData.year}
                  type="number"
                  placeholder="Year"
                  onChange={handleChange}
                  className="dob-input"
                />
              </div>
            </div>
          </div>
          <div>
            {(errors.day && (
              <span className="error-commom">{errors.day}</span>
            )) ||
              (errors.month && (
                <span className="error-commom">{errors.month}</span>
              )) ||
              (errors.year && (
                <span className="error-commom">{errors.year}</span>
              ))}
          </div>
          <div className="next-btn-primay">
            <button type="submit" disabled={false} className="btn-main">
              Next
            </button>
          </div>
        </form>
      ) : (
        <ContactDeatils formData={formData} setFormData={setFormData} />
      )}
    </>
  );
};

export default PersonalDeatils;
