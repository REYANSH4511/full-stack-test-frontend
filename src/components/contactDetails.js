import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { allApi } from "../api";
const ContactDeatils = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      if (/^[0-9]{11}$/.test(value)) {
        return;
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        allApi
          .savePersonalDetails(formData)
          .then((res) => {
            alert(res?.message);
            localStorage.setItem("name", res?.data?.firstName);
            localStorage.setItem("userDetailsId", res?.data?._id);
            navigate("/address-details");
          })
          .catch((error) => {
            alert(error?.response?.data?.message);
          });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setIsSubmitting(false);
    }
  };
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    }

    return errors;
  };
  return (
    <form className="form-contact" onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="head">Enter Your Contact Deatils</div>
        <label for="email">Email Address</label>
        <input
          className="inputField"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input
          className="inputField"
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Phone Number"
          onChange={handleChange}
        />
        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
      </div>
      <div className="submit-btn-primay">
        <button
          type="submit"
          // disabled={isSubmitting}
          className="submit-btn-main"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactDeatils;
