"use client";

import React, { useState } from "react";
import "./stylesheet.css";

const Page = () => {
  // useState for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8077/api/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Pass form data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form Submitted Successfully", result);
        alert("Signup Done sucessfully")
        setFormData({
            name: "",
            email: "",
            number: "",
            password: "",
          });
  
      } else {
        alert("Error submitting form.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="number"
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;