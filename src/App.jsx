import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceDetails from "./pages/InvoiceDetails";
import Products from "./pages/Products";

/* ---------------- DASHBOARD ---------------- */

function Dashboard() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    const totalAmount = invoices.reduce(
      (sum, inv) => sum + (inv.total || 0),
      0
    );

    setTotal(totalAmount);
  }, []);

  const cardStyle = {
    background: "#1c2431",
    padding: "18px",
    borderRadius: "12px",
    marginBottom: "15px",
    color: "white",
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
      <h2>S-Invoice</h2>
      <p style={{ color: "#bbb" }}>Dashboard</p>

      <div style={cardStyle}>
        <h3>Total Sale</h3>
        <p style={{ fontSize: "20px", color: "#2e7dff" }}>
          ₹{total}
        </p>
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
/* ---------------- INVOICES ---------------- */

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(saved);
  }, []);

  return (
    <div style={{ padding: "15px", paddingBottom: "100px" }}>
      
      {/* ✅ HEADER */}
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        Invoices
      </div>

      {/* ✅ EMPTY STATE */}
      {invoices.length === 0 && (
        <p style={{ textAlign: "center", color: "#888", marginTop: "50px" }}>
          No invoices yet
        </p>
      )}

      {/* ✅ INVOICE LIST */}
      {invoices.map((inv) => (
        <Link
          key={inv.id}
          to={`/invoice/${inv.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              background: "#1c2431",
              padding: "15px",
              borderRadius: "14px",
              marginBottom: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            <strong style={{ fontSize: "16px" }}>
              {inv.number}
            </strong>

            <p style={{ color: "#bbb", marginTop: "5px" }}>
              {inv.customer}
            </p>

            <p style={{ color: "#2e7dff", fontWeight: "bold" }}>
              ₹{inv.total}
            </p>

            <small style={{ color: "#888" }}>
              {inv.date}
            </small>
          </div>
        </Link>
      ))}

      {/* ✅ FLOATING BUTTON (Android style) */}
      <Link to="/create-invoice">
        <button
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            background: "#2e7dff",
            color: "white",
            fontSize: "24px",
            border: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          +
        </button>
      </Link>

    </div>
  );
}
/* ---------------- CUSTOMERS ---------------- */

function Customers() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Customers</h1>
    </div>
  );
}

/* ---------------- SETTINGS ---------------- */

function Settings() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>
    </div>
  );
}

/* ---------------- BOTTOM NAV ---------------- */

function BottomNav() {
  const navStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "#111",
    padding: "12px",
    display: "flex",
    justifyContent: "space-around",
    color: "white",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  };

  return (
    <div style={navStyle}>
      <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/invoices" style={linkStyle}>Invoices</Link>
      <Link to="/customers" style={linkStyle}>Customers</Link>
      <Link to="/products" style={linkStyle}>Products</Link>
      <Link to="/settings" style={linkStyle}>Settings</Link>
    </div>
  );
}

/* ---------------- APP ---------------- */

function App() {
  return (
    <HashRouter>
      <div style={{ paddingBottom: "70px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
        </Routes>
      </div>

      <BottomNav />
    </HashRouter>
  );
}

export default App;
