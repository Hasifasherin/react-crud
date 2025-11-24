import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const itemsPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        let apiProducts = res.data;

        // If a new product is passed from AddProduct page
        if (location.state?.newProduct) {
          apiProducts = [location.state.newProduct, ...apiProducts];
        }

        setProducts(apiProducts);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, [location.state]);

  // Sort by ID 
  const sortedProducts = [...products].sort((a, b) => a.id - b.id);

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
        onClick={() => navigate("/add-product")}
      >
        Add Product
      </button>

      <div className="product-grid">
        {currentProducts.map((item) => (
          <ProductCard
            key={item.id}
            data={item}
            onDelete={(id) =>
              setProducts(products.filter((p) => p.id !== id))
            }
            onUpdate={(updated) =>
              setProducts(
                products.map((p) => (p.id === updated.id ? updated : p))
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
            className={`page-number ${
              currentPage === i + 1 ? "active" : ""
            }`}
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
    </div>
  );
};

export default ProductList;
