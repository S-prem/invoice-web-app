import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([]);

  // 🔥 LOAD EXISTING INVOICE
  useEffect(() => {
    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    const existing = invoices.find((inv) => inv.id == id);

    if (existing) {
      setCustomer(existing.customer);
      setItems(existing.items || []);
    }
  }, [id]);

  // ➕ Add Item
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      qty: 1,
      price: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  // 💰 Total
  const total = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  // 💾 UPDATE INVOICE
  const updateInvoice = () => {
    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    const updated = invoices.map((inv) =>
      inv.id == id
        ? {
            ...inv,
            customer,
            items,
            total,
          }
        : inv
    );

    localStorage.setItem("invoices", JSON.stringify(updated));

    // 🔥 refresh dashboard
    window.dispatchEvent(new Event("invoiceUpdated"));

    navigate("/invoices");
  };

  // ❌ SAFETY CHECK
  if (!items) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>Edit Invoice</h2>

      {/* CUSTOMER */}
      <input
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        placeholder="Customer Name"
        style={{ width: "100%", padding: "10px" }}
      />

      {/* ADD ITEM */}
      <button onClick={addItem} style={{ marginTop: "10px" }}>
        + Add Item
      </button>

      {/* ITEMS */}
      {items.map((item) => (
        <div key={item.id} style={{ marginTop: "10px" }}>
          <input
            value={item.name}
            onChange={(e) =>
              setItems((prev) =>
                prev.map((i) =>
                  i.id === item.id
                    ? { ...i, name: e.target.value }
                    : i
                )
              )
            }
            placeholder="Product"
          />

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
          />

          <input value={item.price} readOnly />
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        onClick={updateInvoice}
        style={{
          background: "green",
          color: "white",
          padding: "12px",
          width: "100%",
          marginTop: "15px",
        }}
      >
        Update Invoice
      </button>
    </div>
  );
}

export default EditInvoice;
