import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);

  // Fetch invoice
  useEffect(() => {
    fetch("http://localhost:5000/invoices")
      .then(res => res.json())
      .then(data => {
        const found = data.find(inv => inv.id == id);
        setInvoice(found);
      });
  }, [id]);

  // PDF
  const downloadPDF = () => {
    const element = document.getElementById("invoice-content");

    html2pdf().from(element).save(`Invoice-${invoice?.id}.pdf`);
  };

  const printInvoice = () => window.print();

  const deleteInvoice = async () => {
    await fetch(`http://localhost:5000/delete-invoice/${id}`, {
      method: "DELETE",
    });
    navigate("/invoices");
  };

  const editInvoice = () => {
    navigate(`/edit-invoice/${id}`);
  };

  // 🔒 Safe loading
  if (!invoice) return <p style={{ padding: "20px" }}>Loading...</p>;

  // 🔥 Format items
  const formattedItems = invoice.items.map(item => ({
    name: item.product,
    qty: 1,
    price: item.amount,
    total: item.amount
  }));

  const grandTotal = formattedItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return (
    <div style={{ padding: "20px", background: "#0b1320", minHeight: "100vh", color: "white" }}>

      {/* PDF CONTENT */}
      <div
        id="invoice-content"
        style={{
          background: "white",
          color: "#111",
          padding: "30px",
          maxWidth: "800px",
          margin: "auto",
          borderRadius: "12px",
          fontFamily: "Arial",
        }}
      >

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, color: "#2e7d32" }}>S-INVOICE</h1>
            <p style={{ margin: 0, color: "#555" }}>
              Simple Billing System
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <strong>Invoice #{invoice.id}</strong>

            {/* ✅ SAFE DATE + TIME */}
            {invoice?.createdAt ? (
              <>
                <p>{new Date(invoice.createdAt).toLocaleDateString()}</p>
                <p>{new Date(invoice.createdAt).toLocaleTimeString()}</p>
              </>
            ) : (
              <p style={{ color: "gray" }}>No date</p>
            )}
          </div>
        </div>

        <hr style={{ margin: "20px 0" }} />

        {/* Customer */}
        <div style={{ marginBottom: "20px" }}>
          <strong>Bill To:</strong>
          <p>{invoice.customerName}</p>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={cell}>Item</th>
              <th style={cell}>Qty</th>
              <th style={cell}>Price</th>
              <th style={cell}>Total</th>
            </tr>
          </thead>

          <tbody>
            {formattedItems.map((item, index) => (
              <tr key={index}>
                <td style={cell}>{item.name}</td>
                <td style={cell}>{item.qty}</td>
                <td style={cell}>₹{item.price}</td>
                <td style={cell}>₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <h2 style={{ color: "#2e7d32" }}>
            Grand Total: ₹{grandTotal}
          </h2>
        </div>

        {/* Signature */}
        <div style={{ marginTop: "60px", textAlign: "right" }}>
          <p>______________________</p>
          <p style={{ margin: 0 }}>Authorized Signature</p>
        </div>

        <hr style={{ margin: "20px 0" }} />

        {/* Footer */}
        <p style={{ textAlign: "center", color: "#555" }}>
          Thank you for your business 🙏
        </p>
      </div>

      {/* Buttons */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        marginTop: "20px"
      }}>
        <button style={btnBlue} onClick={downloadPDF}>Download PDF</button>
        <button style={btnGreen} onClick={printInvoice}>Print</button>
        <button style={btnYellow} onClick={editInvoice}>Edit</button>
        <button style={btnRed} onClick={deleteInvoice}>Delete</button>
      </div>
    </div>
  );
}

// Styles
const cell = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
};

const btnBlue = {
  background: "#2e7dff",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px"
};

const btnGreen = {
  background: "green",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px"
};

const btnYellow = {
  background: "#f9a825",
  color: "black",
  padding: "12px",
  border: "none",
  borderRadius: "8px"
};

const btnRed = {
  background: "red",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px"
};

export default InvoiceDetails; 