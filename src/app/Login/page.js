"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./stylesheet.css";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8077/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("LoginPage - API Response:", result);
  
      // Check if the API response contains an email field
      if (result && result.email) { 
        const isAdmin = result.email === "sabn@gmail.com";
  
        // Store login info BEFORE redirecting
        localStorage.setItem("userEmail", result.email);
        localStorage.setItem("isAdmin", isAdmin.toString());
  
        console.log("LoginPage - Stored userEmail:", localStorage.getItem("userEmail"));
        console.log("LoginPage - Stored isAdmin:", localStorage.getItem("isAdmin"));
  
        router.push("/Home"); // Redirect AFTER storing values
      } else {
        console.error("Invalid email received from backend:", result);
        alert("Invalid email received from the backend.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;