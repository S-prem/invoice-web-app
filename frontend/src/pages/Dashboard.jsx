import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
  fetch("http://localhost:5000/invoices")
    .then(res => res.json())
    .then(data => {
      // count
      setCount(data.length);

      // total amount calculation
      const totalAmount = data.reduce((sum, inv) => {
        const invTotal = inv.items.reduce(
          (s, item) => s + item.amount,
          0
        );
        return sum + invTotal;
      }, 0);

      setTotal(totalAmount);
    });
}, []);

  return (
    <div className="container">
      <div className="title">S-invoice</div>
      <div className="subtitle">Dashboard</div>

      {/* Top Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div className="card">
          <p>Total Invoices</p>
          <h3>{count}</h3>
        </div>

        <div className="card">
          <p>Total Collected</p>
          <h3>₹{total}</h3>
        </div>

        <div className="card">
          <p>Total Amount</p>
          <h3>₹{total}</h3>
        </div>

        <div className="card">
          <p>Pending</p>
          <h3>0</h3>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 style={{ marginTop: "20px" }}>Quick Actions</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div className="card green" onClick={() => navigate("/create-invoice")}>
          + Create Invoice
        </div>

        <div className="card" onClick={() => navigate("/invoices")}>
          View Invoices
        </div>

        <div className="card" onClick={() => navigate("/customers")}>
          Customers
        </div>

        <div className="card" onClick={() => navigate("/products")}>
          Products
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
