import React, { useState } from "react";
import "./style.css";
import { allApi } from "../api";
const AddressDeatils = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstName = localStorage.getItem("name");
  const userDetailsId = localStorage.getItem("userDetailsId")
  const [addressData, setAddressData] = useState([
    {
      index: 0,
      address1: "",
      address2: "",
      address3: "",
    },
  ]);
  const handleChange = (e, i) => {
    const { name, value } = e.target;

    const updatedAddressData = [...addressData];

    const dataIndex = updatedAddressData.findIndex((data) => data.index === i);

    if (dataIndex !== -1) {
      if (name === "address1" || name === "address2" || name === "address3") {
        if (/^[a-zA-Z]*$/.test(value) || value === "") {
          updatedAddressData[dataIndex][name] = value;
          setAddressData(updatedAddressData);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(!isSubmitting);
    const validationErrors = validateForm(addressData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newAddressData = addressData.map((obj) => {
        delete obj.index;
        return obj;
      });
      try {
        allApi
          .saveAddressDetails({
            address: newAddressData,
            userDetailsId: userDetailsId,
          })
          .then((res) => {
            alert(res?.message);
          })
          .catch((error) => {
            alert( error?.message);
          });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setIsSubmitting(false);
    }
  };
  const validateForm = (addressData) => {
    const errors = [];

    addressData.forEach((address, index) => {
      const error = {};

      if (!address.address1.trim()) {
        error.address1 = `Address Line 1 is required for item ${index + 1}`;
      }
      if (!address.address2.trim()) {
        error.address2 = `Address Line 2 is required for item ${index + 1}`;
      }
      if (!address.address3.trim()) {
        error.address3 = `Address Line 3 is required for item ${index + 1}`;
      }

      if (Object.keys(error).length > 0) {
        errors.push(error);
      }
    });

    return errors;
  };
  return (
    <>
    <div className="name">{firstName}</div>
    <form className="form-address" onSubmit={handleSubmit}>
      <div className="head">Enter Your Previous Address</div>
      <div class="form-group-address">
        {addressData &&
          addressData?.map((addresses, i) => {
            return (
              <div className="address-block">
                <div key={i}>Previous Address {i + 1}</div>
                <div className="address-input">
                  <input
                    name="address1"
                    value={addresses.address1}
                    type="text"
                    placeholder="Address Line 1"
                    onChange={(e) => handleChange(e, i)}
                    required
                  />
                  <input
                    name="address2"
                    value={addresses.address2}
                    type="text"
                    placeholder="Address Line 2"
                    onChange={(e) => handleChange(e, i)}
                    required
                  />
                  <input
                    name="address3"
                    value={addresses.address3}
                    type="text"
                    placeholder="Address Line 3"
                    onChange={(e) => handleChange(e, i)}
                    required
                  />
                </div>
              </div>
            );
          })}
      </div>

      <div className="submit-btn-primay">
        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn-main-address"
        >
          Submit
        </button>
      </div>
      <div className="address-block-changes">
        <a
          href="#"
          onClick={() =>
            setAddressData([
              ...addressData,
              {
                index: addressData.length,
                address1: "",
                address2: "",
                address3: "",
              },
            ])
          }
        >
          Add Address
        </a>
        <br></br>
        {addressData.length > 1 && (
          <a
            href="#"
            onClick={() => {
              const newArray = addressData.slice(0, -1);
              setAddressData(newArray);
            }}
          >
            Remove Address
          </a>
        )}
      </div>
    </form>
    </>
  );
};

export default AddressDeatils;
