"use client";

import React, { useState, useEffect } from "react";
import "./stylesheet.css";
import Image from "next/image";
import Items from "../Items/page.js";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [userName, setUserName] = useState(null); // State to store user's name

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName"); // Get name from localStorage
    setUserName(storedUserName);
  }, []);

  const handleLoginClick = () => {
    router.push("/Login"); // Redirect to the login page
  };

  const handleSignupClick = () => {
    router.push("/Signup"); // Redirect to the Signup page
  };

  const handleLogoutClick = () => {
    // Clear localStorage values
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("canEdit");
    localStorage.removeItem("authToken"); // Assuming token is stored as "authToken"

    alert("You have been logged out."); // Notify the user

    setUserName(null); // Clear the username in state
    router.push("/Home"); // Redirect to the Front page
  };

  return (
    <>
      <div className="page-container">
        <div className="header-container">
          <div className="header-contact">
            <p>+91 8888444555</p>
          </div>
          <div className="header-title">
            <p>Welcome to Nandini Brass & Silver Metal's</p>
          </div>
        </div>

        <div className="main-content">
          <div className="hero-section">
            <div className="navbar">
              <div className="navbar-logo">
                <span className="logo">
                    Nandhini brass
                </span>
              </div>
              <div>
                <ul className="navbar-list">
                  <li>Home</li>
                  <li>Services</li>
                  <li>Contact us</li>
                  <li>About us</li>
                  <li>Social Platform's</li>
                </ul>
              </div>
              <div className="navbar-user-section">
                <li>Cart</li>
                {userName ? (
                  <li className="navbar-user-name">{userName}</li> // Display user's name if logged in
                ) : (
                  <li className="navbar-login" onClick={handleLoginClick}>
                    Login
                  </li> // Display "Login" if not logged in
                )}
                <li className="navbar-logout" onClick={handleLogoutClick}>
                  Logout
                </li> {/* Handle logout */}
                <li className="navbar-signup" onClick={handleSignupClick}>
                  Signup
                </li>
              </div>
            </div>
          </div>
<div className="hero-header">
          <div className="hero-title">
            <h1>Nandhini Brass & Metals</h1>
            <p>
              At Nandhini Silver and Metal, we specialize in crafting exquisite
              brass god idols and premium brass metals that embody tradition,
              artistry, and quality. Experience the elegance of our timeless
              creations.
            </p>
            <br />
            <button
              onClick={() => {
                alert("We are coming soon.");
              }}
              className="primary-button"
            >
              Book Now
            </button>
          </div>
          <div className="hero-image">
            <Image
              className="featured-image"
              src="/vink.jpg"
              width={400}
              height={400}
              alt="Nandhini Brass Works"
            />
          </div>
          </div>

          <div className="featured-container">
            <div className="featured-title">
              <h1>Our Featured Collections</h1>
            </div>
          </div>

          <Items />
        </div>

        <div className="about-wrapper">
          <div className="about-header">
            <h1>Welcome to Nandhini Metals and Brass</h1>
          </div>
          <p className="about-content">
            Welcome to Nandini Brass & Silver Works, where tradition meets
            craftsmanship. Located in the heart of Uppal, Hyderabad, we are
            proud manufacturers of exquisite brass and metal alloy products,
            bringing artistry and precision to life. With years of expertise in
            the industry, we specialize in crafting high-quality brass statues,
            metal handicrafts, and custom alloy designs. Every piece we create
            reflects a perfect blend of traditional techniques and modern
            innovations, ensuring durability, beauty, and exceptional
            craftsmanship.
            <br />
            <br /> At Nandini Brass & Silver Works, we are committed to
            delivering products that exceed expectations. Whether you're seeking
            decorative pieces, religious artifacts, or custom metal creations,
            our team of skilled artisans works with dedication and attention to
            detail to bring your vision to reality. Our journey is fueled by a
            passion for metalworking and a dedication to customer satisfaction.
            We believe in building lasting relationships by providing
            personalized service, quality assurance, and timely delivery.
            Explore our collections and let us craft something extraordinary for
            you!
          </p>
        </div>

        <div className="footer-container">
          <div className="footer-header">
            <h1>About Us</h1>
           
          </div>
          <div >
          <div className="footer-details">
            <div>
              <p>Shop no 2</p>
              <p>Uppal Hyderabad 52036</p>
              <p>Bookings and Customer Support: +91 9852220</p>
              <p>Email: dfda@gmail.com</p>
              <p>
                Contact our customer service team from 9:00 am to 7:00 pm
                everyday
              </p>
              <p>Social Media</p>
            </div>
            <div className="footer-map">
              <iframe
                className="embedded-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.0628273558665!2d78.563581!3d17.396657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f0f7f7c10b%3A0x5bbebc9c4b48422b!2sCentral%20Main%20Road%2C%20Uppal%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1680767401234!5m2!1sen!2sin"
                width="500"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;