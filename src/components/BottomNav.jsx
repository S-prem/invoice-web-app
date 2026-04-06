import { Link } from "react-router-dom";
import { FaHome, FaFileInvoice, FaUsers, FaBox, FaCog } from "react-icons/fa";

function BottomNav() {
  const nav = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "#0f172a",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0",
  };

  const item = {
    color: "white",
    textDecoration: "none",
    fontSize: "12px",
    textAlign: "center",
  };

  return (
    <div style={nav}>
      <Link to="/" style={item}>
        <FaHome /><br />Dashboard
      </Link>

      <Link to="/invoices" style={item}>
        <FaFileInvoice /><br />Invoices
      </Link>

      <Link to="/customers" style={item}>
        <FaUsers /><br />Customers
      </Link>

      <Link to="/products" style={item}>
        <FaBox /><br />Products
      </Link>

      <Link to="/settings" style={item}>
        <FaCog /><br />Settings
      </Link>
    </div>
  );
}

export default BottomNav;
