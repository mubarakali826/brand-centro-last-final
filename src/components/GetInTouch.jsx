import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import flag from "../assets/dubai.png"
const ContactForm = () => {
    const navigate=useNavigate();

  const [formData, setFormData] = useState({
    phone: "+971",
    email: "",
    name: "",
    requirements: "",
  });
  const handleNavigate=()=>{  
    navigate(-1);
   }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-[50vw] w-full p-6 relative h-[70vh]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => handleNavigate()}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order a call</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your phone number
            </label>
            <div className="flex items-center border rounded-lg p-2">
                <img src={flag } className="pr-2 h-5 w-10" alt="" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 outline-none"
                placeholder="+971"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 outline-none"
              placeholder="Your name"
            />
          </div>

          {/* Requirements Input */}
          <div>
            <input
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 outline-none"
              placeholder="Your requirements"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
