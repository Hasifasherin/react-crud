import React, { useState, useEffect } from "react";
import api from "../../Utils/baseUrl";
import { toast } from "react-toastify";
import "./Modal.css";

const Edit = ({ id, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  // Fetch product data when modal opens
  useEffect(() => {
    if (!id) return;

    api
      .get(`/admin/products/${id}`)
      .then((res) => {
        const p = res.data.product;

        setForm({
          title: p.title || "",
          price: p.price || "",
          category: p.category || "",
          image: p.image || "",
          description: p.description || "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product:", err);
        toast.error("Failed to load product");
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.put(`/admin/products/${id}`, form);

      // Update the parent product list
      onUpdate(res.data.product);

      // Close modal
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-box edit-box">
        <h3>Edit Product</h3>

        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="textarea"
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-success" onClick={handleSubmit}>
            Update Product
          </button>

          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
