import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Delete from "./Delete.jsx";
import Edit from "./Edit.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const ProductCard = ({ data, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  if (!data) return null; // safety check for Vite refresh

  /* ---------------- DELETE PRODUCT ---------------- */
  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${data.id}`);
      toast.success("Product deleted successfully!");
    } catch {
      toast.success("Product deleted! (FakeStore fallback)");
    }

    onDelete?.(data.id);
    setShowDelete(false);
  };

  /* ---------------- UPDATE PRODUCT ---------------- */
  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(
        `https://fakestoreapi.com/products/${data.id}`,
        updatedData
      );
      toast.success("Product updated successfully!");
    } catch {
      toast.success("Product updated! (FakeStore fallback)");
    }

    onUpdate?.({ ...data, ...updatedData });
    setShowEdit(false);
  };

  return (
    <>
      <div className="card p-3 text-center">
        <img
          src={data.image}
          alt={data.title}
          className="card-img-top"
          style={{ height: "150px", objectFit: "contain" }}
        />

        <h6 className="mt-2">
          {data.title ? data.title.slice(0, 30) : "No Title"}...
        </h6>

        <p className="text-success fw-bold">₹{data.price || 0}</p>

        <button
          className="btn btn-primary w-100 mb-2"
          onClick={() => navigate(`/product/${data.id}`)}
        >
          View Product
        </button>

        <button
          className="btn btn-danger w-100 mb-2"
          onClick={() => setShowDelete(true)}
        >
          Delete
        </button>

        <button
          className="btn btn-success w-100"
          onClick={() => setShowEdit(true)}
        >
          Edit
        </button>
      </div>

      {showDelete && (
        <Delete onClose={() => setShowDelete(false)} onConfirm={handleDelete} />
      )}

      {showEdit && (
        <Edit
          id={data.id}
          onClose={() => setShowEdit(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default ProductCard;
