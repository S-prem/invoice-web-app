import { useState } from "react";

function CreateInvoice() {
  const [customer, setCustomer] = useState("");
  const [note, setNote] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      qty: 1,
      price: 0,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id, field, value) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updated);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const saveInvoice = () => {
    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    const newInvoice = {
      id: Date.now(),
      customer,
      note,
      items,
      total: totalAmount,
      date: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "invoices",
      JSON.stringify([...invoices, newInvoice])
    );

    alert("Invoice saved!");
  };

  const cardStyle = {
    background: "#1c2431",
    color: "white",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "15px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };
<h1 style={{ color: "red" }}>CREATE INVOICE NEW UI</h1>
  return (
    <div
      style={{
        padding: "16px",
        background: "#0b1320",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h2>Create Invoice</h2>

      {/* Invoice Date */}
      <div style={cardStyle}>
        <strong>Invoice Date</strong>
        <div style={{ marginTop: "6px", color: "#bbb" }}>
          {new Date().toDateString()}
        </div>
      </div>

      {/* Customer */}
      <div style={cardStyle}>
        <strong>Customer</strong>
        <input
          style={inputStyle}
          placeholder="Select customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>

      {/* Items */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Items</strong>
          <button
            onClick={addItem}
            style={{
              background: "#2e7dff",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            + Add Item
          </button>
        </div>

        {items.length === 0 && (
          <p style={{ color: "#aaa", marginTop: "10px" }}>
            No items added yet
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            style={{
              marginTop: "12px",
              background: "#111827",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <input
              style={inputStyle}
              placeholder="Item name"
              value={item.name}
              onChange={(e) =>
                updateItem(item.id, "name", e.target.value)
              }
            />

            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <input
                style={{ ...inputStyle, marginTop: 0 }}
                type="number"
                placeholder="Qty"
                value={item.qty}
                onChange={(e) =>
                  updateItem(item.id, "qty", Number(e.target.value))
                }
              />

              <input
                style={{ ...inputStyle, marginTop: 0 }}
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) =>
                  updateItem(item.id, "price", Number(e.target.value))
                }
              />
            </div>
          </div>
        ))}

        <h3 style={{ marginTop: "15px" }}>Total: ₹{totalAmount}</h3>
      </div>

      {/* Note */}
      <div style={cardStyle}>
        <strong>Note</strong>
        <textarea
          style={inputStyle}
          placeholder="Add note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={saveInvoice}
        style={{
          width: "100%",
          background: "#22c55e",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Save Invoice
      </button>
    </div>
  );
}


export default CreateInvoice;