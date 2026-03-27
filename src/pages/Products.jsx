import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  const addProduct = () => {
    if (!name || !price) return;

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
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addProduct}>Add Product</button>

      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ₹{p.price}
        </div>
      ))}
    </div>
  );
}

export default Products;
