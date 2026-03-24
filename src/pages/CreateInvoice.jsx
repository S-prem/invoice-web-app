import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateInvoice() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState("");
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

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const saveInvoice = () => {
  const invoices =
    JSON.parse(localStorage.getItem("invoices")) || [];

  const lastInvoiceNumber =
    invoices.length > 0
      ? parseInt(invoices[invoices.length - 1].number?.split("-")[1] || 0)
      : 0;

  const invoiceNumber =
  "INV-" + String(invoices.length + 1).padStart(4, "0");

const newInvoice = {
  id: Date.now(),
  number: invoiceNumber,
  customer,
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
    <div style={{ padding: "20px" }}>
      <h2>Create Invoice</h2>

      <input
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <button onClick={addItem}>+ Add Item</button>

      {items.map((item) => (
        <div key={item.id} style={{ marginTop: "10px" }}>
          <input
            placeholder="Item"
            value={item.name}
            onChange={(e) =>
              updateItem(item.id, "name", e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Qty"
            value={item.qty}
            onChange={(e) =>
              updateItem(item.id, "qty", Number(e.target.value))
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
              updateItem(item.id, "price", Number(e.target.value))
            }
          />
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        onClick={saveInvoice}
        style={{
          background: "green",
          color: "white",
          padding: "12px",
          width: "100%",
          marginTop: "15px",
        }}
      >
        Save Invoice
      </button>
    </div>
  );
}

export default CreateInvoice;