import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
function Dashboard() {
  const cardStyle = {
    background: "#1c2431",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "15px",
  };

  return (
    <div style={{ padding: "20px", background: "#0b1320", minHeight: "100vh" }}>
      <h2 style={{ color: "white" }}>S-invoice</h2>
      <p style={{ color: "#bbb" }}>Dashboard</p>

      <div style={cardStyle}>
        <h3>Total Sale</h3>
        <p>₹0</p>
      </div>

      <div style={cardStyle}>
        <h3>Total Purchase</h3>
        <p>₹0</p>
      </div>

      <div style={cardStyle}>
        <h3>Sales Due</h3>
        <p>₹0</p>
      </div>

      <div style={cardStyle}>
        <h3>Purchase Due</h3>
        <p>₹0</p>
      </div>
    </div>
  );
}

import { useState } from "react";
import CreateInvoice from "./pages/CreateInvoice";


function Invoices() {
  const [invoices, setInvoices] = useState(
    JSON.parse(localStorage.getItem("invoices")) || []
  );

  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");

  const saveInvoice = () => {
    if (!customer || !amount) return;

    const newInvoice = {
      id: Date.now(),
      customer,
      amount,
    };

    const updated = [...invoices, newInvoice];
    setInvoices(updated);
    localStorage.setItem("invoices", JSON.stringify(updated));

    setCustomer("");
    setAmount("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoices</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button onClick={saveInvoice} style={{ marginLeft: "10px" }}>
          Save
        </button>
      </div>

      <ul>
        {invoices.map((inv) => (
          <li key={inv.id}>
            {inv.customer} — ₹{inv.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Customers() {
  return <h1 style={{ padding: "20px" }}>Customers</h1>;
}

function Products() {
  return <h1 style={{ padding: "20px" }}>Products</h1>;
}

function Settings() {
  return <h1 style={{ padding: "20px" }}>Settings</h1>;
}

function BottomNav() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#111",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        padding: "12px",
      }}
    >
      <Link to="/">Dashboard</Link>
<Link to="/invoices">Invoices</Link>
<Link to="/customers">Customers</Link>
<Link to="/products">Products</Link>
<Link to="/settings">Settings</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ paddingBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
        </Routes>
      </div>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
