import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceDetails from "./pages/InvoiceDetails";


/* ---------------- DASHBOARD ---------------- */

function Dashboard() {
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

/* ---------------- INVOICES ---------------- */

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(saved);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoices</h2>

      <Link to="/create-invoice">
        <button
          style={{
            background: "#2e7dff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          + Create Invoice
        </button>
      </Link>

      {invoices.length === 0 && <p>No invoices yet</p>}

     {invoices.map((inv) => (
  <Link
    key={inv.id}
    to={`/invoice/${inv.id}`}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <strong>{inv.number}</strong>
      <p>{inv.customer}</p>
      <p>₹{inv.total}</p>

      {inv.items && inv.items.map((item, index) => (
        <div key={index}>
          {item.name} - {item.qty} × ₹{item.price}
        </div>
      ))}

      <small>{inv.date}</small>
    </div>
  </Link>
))}

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

/* ---------------- PRODUCTS ---------------- */

function Products() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
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
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
