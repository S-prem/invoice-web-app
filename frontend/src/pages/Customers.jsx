function Customers() {
  return (
    <div className="container">
      <div className="title">Customers</div>
      <p className="subtitle">0 customers</p>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        No customers yet
        <br />
        <button className="green" style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "10px", border: "none" }}>
          + Add Customer
        </button>
      </div>
    </div>
  );
}

export default Customers;
