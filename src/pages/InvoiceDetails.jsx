import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

function InvoiceDetails() {
  const { id } = useParams();

  const invoices =
    JSON.parse(localStorage.getItem("invoices")) || [];

  const invoice = invoices.find((inv) => inv.id == id);

  const downloadPDF = () => {
    const element = document.getElementById("invoice-content");
    html2pdf().from(element).save(`${invoice.number}.pdf`);
  };

  if (!invoice) {
    return <p>Invoice not found</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      
      {/* ✅ WRAPPER START */}
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
      {/* ✅ WRAPPER END */}

      {/* ✅ BUTTON */}
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "20px",
          background: "#2e7dff",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Download PDF
      </button>

    </div>
  );
}

export default InvoiceDetails;
