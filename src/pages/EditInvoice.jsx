import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const invoices =
    JSON.parse(localStorage.getItem("invoices")) || [];

  const existingInvoice = invoices.find((inv) => inv.id == id);

  const [customer, setCustomer] = useState(
    existingInvoice?.customer || ""
  );
  const [items, setItems] = useState(
    existingInvoice?.items || []
  );

  if (!existingInvoice) {
    return <p>Invoice not found</p>;
  }

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const total = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const saveChanges = () => {
    const updatedInvoices = invoices.map((inv) =>
      inv.id == id
        ? { ...inv, customer, items, total }
        : inv
    );

    localStorage.setItem(
      "invoices",
      JSON.stringify(updatedInvoices)
    );

    navigate("/invoices");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Invoice</h2>

      <input
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      {items.map((item, index) => (
        <div key={index} style={{ marginTop: "10px" }}>
          <input
            value={item.name}
            onChange={(e) =>
              updateItem(index, "name", e.target.value)
            }
          />

          <input
            type="number"
            value={item.qty}
            onChange={(e) =>
              updateItem(index, "qty", Number(e.target.value))
            }
          />

          <input
            type="number"
            value={item.price}
            onChange={(e) =>
              updateItem(index, "price", Number(e.target.value))
            }
          />
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button onClick={saveChanges}>
        Save Changes
      </button>
    </div>
  );
}

export default EditInvoice;
