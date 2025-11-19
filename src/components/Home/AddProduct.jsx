import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Modal.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.category) {
      toast.error("Please fill all required fields!");
      return;
    }

    axios
      .post("https://fakestoreapi.com/products", formData)
      .then((res) => {
        toast.success("Product added successfully!");

        navigate("/", { state: { newProduct: res.data } });
      })
      .catch(() => toast.error("Failed to add product!"));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-success">Add Product</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
