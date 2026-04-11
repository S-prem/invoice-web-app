import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateInvoice() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  // Load products
  useEffect(() => {
  const loadProducts = () => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  };

  loadProducts();

  window.addEventListener("productUpdated", loadProducts);

  return () =>
    window.removeEventListener("productUpdated", loadProducts);
}, []);

  // Add new item
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      qty: 1,
      price: 0,
    };
    setItems([...items, newItem]);
  };

  // Update item (for qty)
  const updateItem = (id, field, value) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updated);
  };

  // Total calculation
  const total = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  // Save invoice
 const saveInvoice = async () => {
  if (!customer.trim() || items.length === 0) return;

  await fetch("http://localhost:5000/add-invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      customerName: customer,
      items: items.map(item => ({
        product: item.name,
        amount: item.qty * item.price
      }))
    })
  });

  alert("Invoice saved to database ✅");
navigate("/invoices");
window.location.reload(); // 🔥 IMPORTANT
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
      <h2>Create Invoice</h2>

      {/* Customer */}
      <input
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "none",
        }}
      />

      {/* Add Item Button */}
      <button
        onClick={addItem}
        style={{
          background: "#2e7dff",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          marginBottom: "15px",
        }}
      >
        + Add Item
      </button>

      {/* Items */}
     {items.map((item) => (
  <div
    key={item.id}
    className="card"
    style={{
      marginTop: "10px",
      display: "flex",
      gap: "10px",
      alignItems: "center",
    }}
  >
    {/* PRODUCT SELECT */}
    <select
      value={item.name}
      onChange={(e) => {
        const selected = products.find(
          (p) => p.name === e.target.value
        );

        if (selected) {
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    name: selected.name,
                    price: selected.price,
                  }
                : i
            )
          );
        }
      }}
      style={{ flex: 2 }}
    >
      <option value="">Select</option>
      {products.map((p) => (
        <option key={p.id} value={p.name}>
          {p.name}
        </option>
      ))}
    </select>

    {/* QTY */}
    <input
      type="number"
      value={item.qty}
      onChange={(e) =>
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, qty: Number(e.target.value) }
              : i
          )
        )
      }
      style={{ width: "60px" }}
    />

    {/* PRICE */}
    <input
      value={item.price}
      readOnly
      style={{ width: "80px" }}
    />

    {/* DELETE ITEM */}
    <button
      onClick={() =>
        setItems((prev) =>
          prev.filter((i) => i.id !== item.id)
        )
      }
      style={{
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "5px",
      }}
    >
      ❌
    </button>
  </div>
))}

      {/* Total */}
      <h2 style={{ marginTop: "15px" }}>Total: ₹{total}</h2>

      {/* Save */}
      <button
        onClick={saveInvoice}
        style={{
          background: "green",
          color: "white",
          padding: "12px",
          width: "100%",
          marginTop: "15px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
        }}
      >
        Save Invoice
      </button>
    </div>
  );
}

export default CreateInvoice;
