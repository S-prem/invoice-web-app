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
    html2pdf().from(element).save(`${invoice.number}.pdf`);
  };

  const deleteInvoice = () => {
    const updated = invoices.filter((inv) => inv.id != id);
    localStorage.setItem("invoices", JSON.stringify(updated));
    navigate("/invoices");
  };

  if (!invoice) {
    return <p>Invoice not found</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      
      <div id="invoice-content">
        <h2>{invoice.number}</h2>

        <p><strong>Customer:</strong> {invoice.customer}</p>
        <p><strong>Date:</strong> {invoice.date}</p>

        <h3>Items</h3>

        {invoice.items && invoice.items.map((item, index) => (
          <div key={index}>
            {item.name} - {item.qty} × ₹{item.price}
          </div>
        ))}

        <h2>Total: ₹{invoice.total}</h2>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          marginTop: "20px",
          background: "#2e7dff",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          width: "100%",
        }}
      >
        Download PDF
      </button>

      <button
        onClick={deleteInvoice}
        style={{
          marginTop: "10px",
          background: "red",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          width: "100%",
        }}
      >
        Delete Invoice
      </button>

    </div>
  );
}

export default InvoiceDetails;
