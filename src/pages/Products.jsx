import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
  const loadProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const formatted = data.map((p) => ({
        id: p.id,
        name: p.title,
        price: Math.round(p.price * 80), // USD → INR approx
      }));

      setProducts(formatted);
      localStorage.setItem("products", JSON.stringify(formatted));

      console.log("API products loaded");
    } catch (error) {
      console.log("API failed, using fallback");

      const fallback = [
        { id: 1, name: "Laptop", price: 50000 },
        { id: 2, name: "Mobile", price: 20000 },
        { id: 3, name: "TV", price: 40000 },
      ];

      setProducts(fallback);
      localStorage.setItem("products", JSON.stringify(fallback));
    }
  };

  loadProducts();
}, []);

  const addProduct = () => {
    if (!name || !price) {
      alert("Enter product details");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
    };

    const updated = [...products, newProduct];

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    setName("");
    setPrice("");

    // 🔥 notify other pages (like CreateInvoice)
    window.dispatchEvent(new Event("productUpdated"));
  };

  return (
    <div className="container">
      <div className="title">Products & Services</div>

      {/* ADD PRODUCT FORM */}
      <div className="card" style={{ marginTop: "15px" }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          onClick={addProduct}
          className="green"
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
          }}
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      {products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No products yet
        </p>
      )}

      {products.map((p) => (
        <div className="card" key={p.id} style={{ marginTop: "10px" }}>
          <strong>{p.name}</strong>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;