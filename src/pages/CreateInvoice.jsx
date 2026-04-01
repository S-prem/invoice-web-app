import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateInvoice() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  // Load products
  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
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
  const saveInvoice = () => {
    if (!customer.trim() || items.length === 0) return;

    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    const invoiceNumber =
      "INV-" + String(invoices.length + 1).padStart(4, "0");

    const newInvoice = {
      id: Date.now(),
      number: invoiceNumber,
      customer: customer.trim(),
      items,
      total,
      date: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "invoices",
      JSON.stringify([...invoices, newInvoice])
    );

    navigate("/invoices");
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
          style={{
            background: "#1c2431",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          {/* Product Dropdown */}
          <select
            value={item.name}
            onChange={(e) => {
              const selected = products.find(
                (p) => p.name.trim() === e.target.value.trim()
              );

              if (!selected) return;

              const updated = items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      name: selected.name,
                      price: selected.price,
                    }
                  : i
              );

              setItems(updated);
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              border: "none",
            }}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} - ₹{p.price}
              </option>
            ))}
          </select>

          {/* Qty + Price row */}
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="number"
              placeholder="Qty"
              value={item.qty}
              onChange={(e) =>
                updateItem(item.id, "qty", Number(e.target.value))
              }
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "none",
              }}
            />

            <input
              type="number"
              value={item.price}
              readOnly
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#ccc",
              }}
            />
          </div>
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
