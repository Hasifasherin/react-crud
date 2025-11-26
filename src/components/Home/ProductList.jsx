import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import AddProduct from "./AddProduct.jsx";
import api from "../../Utils/baseUrl.js";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const itemsPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/admin/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadProducts();
  }, []);

  // Sort by ID
  const sortedProducts = [...products].sort((a, b) =>
    a._id.localeCompare(b._id)
  );

  const last = currentPage * itemsPerPage;
  const first = last - itemsPerPage;
  const currentProducts = sortedProducts.slice(first, last);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="product-wrapper">
      <h2 className="title">Product List</h2>

      <button
        className="add-product-btn"
        onClick={() => setShowAddModal(true)}
      >
        Add Product
      </button>

      <div className="product-grid">
        {currentProducts.map((item) => (
          <ProductCard
            key={item._id}
            data={item}
            onDelete={(id) =>
              setProducts(products.filter((p) => p._id !== id))
            }
            onUpdate={(updated) =>
              setProducts(
                products.map((p) => (p._id === updated._id ? updated : p))
              )
            }
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
  <AddProduct
    onClose={() => setShowAddModal(false)}
    onAdd={(newProduct) => {
      setProducts([newProduct, ...products]);
      setShowAddModal(false);
    }}
  />
)}

    </div>
  );
};

export default ProductList;
