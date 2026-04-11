import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/invoices")
    .then(res => res.json())
    .then(data => {
      console.log("Fetched invoices:", data); // 👈 debug
      setInvoices(data);
    });
}, []);

  return (
    <div className="container">
      <div className="title">Invoices</div>
      <p className="subtitle">{invoices.length} invoices</p>

      {invoices.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          No invoices yet
          <br />
          <Link to="/create-invoice">
            <button className="green" style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "10px", border: "none" }}>
              + Create Invoice
            </button>
          </Link>
        </div>
      )}

      {invoices.map((inv) => (
        <Link key={inv.id} to={`/invoice/${inv.id}`} style={{ textDecoration: "none" }}>
          <div className="card" style={{ marginTop: "10px" }}>
            <strong>Invoice #{inv.id}</strong>
<p>{inv.customerName}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Invoices;
