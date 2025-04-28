"use client";

import React, { useState, useEffect } from "react";
import "./stylesheet.css";

const Items = () => {
  const [savedData, setSavedData] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formdata, updateformdata] = useState({
    category: "",
    price: "",
    discription: "",
    image: "",
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";
    const storedCanEdit = localStorage.getItem("canEdit") === "true";

    setUserEmail(storedEmail);
    setIsAdmin(storedIsAdmin);
    setCanEdit(storedCanEdit);

    fetchSavedData();
  }, []);

  const fetchSavedData = async () => {
    try {
      const response = await fetch("http://localhost:8077/api/getuploads");
      const data = await response.json();
      setSavedData(data);
    } catch (err) {
      console.error("Error fetching saved data:", err);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", e.target.image.files[0]);
      formData.append("category", formdata.category);
      formData.append("price", formdata.price);
      formData.append("discription", formdata.discription);

      const response = await fetch("http://localhost:8077/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        fetchSavedData();
        updateformdata({
          category: "",
          price: "",
          discription: "",
          image: "",
        });
        e.target.image.value = "";

        
      } else {
        alert("Failed to upload: " + result.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch("http://localhost:8077/api/deletes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (response.ok) {
        alert("All products deleted successfully!");
        fetchSavedData();
      } else {
        alert("Failed to delete all: " + result.message);
      }
    } catch (err) {
      console.error("Error deleting all products:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    updateformdata({
      category: item.category,
      price: item.price,
      discription: item.discription,
      image: "",
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8077/api/delete/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        alert("Product deleted successfully!");
        fetchSavedData();
      } else {
        alert("Failed to delete: " + result.message);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="container">
      {isAdmin ? (
        <div className="admin-dashboard">
          <h2>ADMIN DASHBOARD</h2>
          <button className="delete-all-btn" onClick={handleDeleteAll}>Delete All Items</button>

          <form className="product-form" onSubmit={handlesubmit}>
            <input type="text" placeholder="Category" className="input-field" value={formdata.category} onChange={(e) => updateformdata({ ...formdata, category: e.target.value })} />
            <input type="number" placeholder="Price" className="input-field" value={formdata.price} onChange={(e) => updateformdata({ ...formdata, price: e.target.value })} />
            <input type="text" placeholder="Description" className="input-field" value={formdata.discription} onChange={(e) => updateformdata({ ...formdata, discription: e.target.value })} />
            <input type="file" name="image" accept="image/*" className="input-field" />
            <button className="submit-btn" type="submit">Submit</button>
          </form>
        </div>
      ) : canEdit ? (
        <h2 className="edit-title">EDIT PRODUCTS</h2>
      ) : (
        <p className="view-products">View Products</p>
      )}

      <div className="card-container">
        {savedData.map((item) => (
          <div key={item._id} className="card">
            <img src={`http://localhost:8066${item.image}`} alt="Product" className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{item.category}</h3>
              <p className="card-price">Price: {item.price}</p>
              <p className="card-description">Description: {item.discription}</p>
              {isAdmin ? (
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              ) : (
                <>
                  <button className="buy-now">Buy Now</button>
                  <button className="add-cart">Add to Cart</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;