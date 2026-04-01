import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const invoices =
    JSON.parse(localStorage.getItem("invoices")) || [];

  const invoice = invoices.find((inv) => inv.id == id);

  const downloadPDF = () => {
    const element = document.getElementById("invoice-content");

    const opt = {
      margin: 0.5,
      filename: `${invoice.number}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const printInvoice = () => {
    window.print();
  };

  const deleteInvoice = () => {
    const updated = invoices.filter((inv) => inv.id != id);
    localStorage.setItem("invoices", JSON.stringify(updated));
    navigate("/invoices");
  };

  const editInvoice = () => {
    navigate(`/edit-invoice/${id}`); // future use
  };

  if (!invoice) {
    return <p>Invoice not found</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        background: "#0b1320",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* PDF CONTENT */}
      <div
        id="invoice-content"
        style={{
          background: "white",
          color: "black",
          padding: "25px",
          maxWidth: "800px",
          margin: "auto",
          borderRadius: "10px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0 }}>S-INVOICE</h1>
          <p style={{ margin: 0 }}>Your Business Name</p>
        </div>

        {/* Info Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <strong>Invoice No:</strong> {invoice.number}
            <br />
            <strong>Date:</strong> {invoice.date}
            <br />
            <strong>Time:</strong>{" "}
            {new Date(invoice.id).toLocaleTimeString()} {/* ✅ time */}
          </div>

          <div>
            <strong>Bill To:</strong>
            <br />
            {invoice.customer}
          </div>
        </div>

        {/* Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ background: "#eee" }}>
              <th style={cellStyle}>Item</th>
              <th style={cellStyle}>Qty</th>
              <th style={cellStyle}>Price</th>
              <th style={cellStyle}>Total</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items &&
              invoice.items.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle}>{item.name}</td>
                  <td style={cellStyle}>{item.qty}</td>
                  <td style={cellStyle}>₹{item.price}</td>
                  <td style={cellStyle}>
                    ₹{item.qty * item.price}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Total */}
        <div style={{ textAlign: "right" }}>
          <h2>Total: ₹{invoice.total}</h2>
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          Thank you for your business 🙏
        </p>
      </div>

      {/* 🔥 BUTTON GRID (4 buttons) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* LEFT TOP */}
        <button style={btnBlue} onClick={downloadPDF}>
          Download PDF
        </button>

        {/* RIGHT TOP */}
        <button style={btnGreen} onClick={printInvoice}>
          Print
        </button>

        {/* LEFT BOTTOM */}
        <button style={btnYellow} onClick={editInvoice}>
          Edit
        </button>

        {/* RIGHT BOTTOM */}
        <button style={btnRed} onClick={deleteInvoice}>
          Delete
        </button>
      </div>
    </div>
  );
}

// Table style
const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
};

// Button styles
const btnBlue = {
  background: "#2e7dff",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  width: "100%",
  fontWeight: "bold",
};

const btnGreen = {
  background: "green",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  width: "100%",
  fontWeight: "bold",
};

const btnYellow = {
  background: "#f9a825",
  color: "black",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  width: "100%",
  fontWeight: "bold",
};

const btnRed = {
  background: "red",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  width: "100%",
  fontWeight: "bold",
};

export default InvoiceDetails;