import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Load products
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  // Add product
  const addProduct = () => {
    if (!name.trim() || !price) return;

    const newProduct = {
      id: Date.now(),
      name: name.trim(), // ✅ fix space issue
      price: Number(price),
    };

    const updated = [...products, newProduct];

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    setName("");
    setPrice("");
  };

  // Delete product
  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#0b1320",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h2>Products</h2>

      {/* Input Section */}
      <div
        style={{
          background: "#1c2431",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          onClick={addProduct}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2e7dff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Product List */}
      {products.length === 0 && <p>No products added</p>}

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            background: "#1c2431",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>{p.name}</strong>
            <p style={{ margin: 0, color: "#bbb" }}>₹{p.price}</p>
          </div>

          <button
            onClick={() => deleteProduct(p.id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;