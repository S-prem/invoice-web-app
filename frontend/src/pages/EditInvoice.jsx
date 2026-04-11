import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([]);

  // 🔥 Load invoice data
  useEffect(() => {
    fetch("http://localhost:5000/invoices")
      .then(res => res.json())
      .then(data => {
        const inv = data.find(i => i.id == id);

        if (inv) {
          setCustomer(inv.customerName);
          setItems(
            inv.items.map(item => ({
              id: Date.now() + Math.random(),
              name: item.product,
              qty: 1,
              price: item.amount
            }))
          );
        }
      });
  }, [id]);

  // ➕ Add item
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "", qty: 1, price: 0 }
    ]);
  };

  // 🔄 Update item
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // ❌ Delete item
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // 💾 Save update
  const updateInvoice = async () => {
    await fetch(`http://localhost:5000/update-invoice/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerName: customer,
        items: items.map(i => ({
          product: i.name,
          amount: i.qty * i.price
        }))
      })
    });

    alert("Updated ✅");
    navigate("/invoices");
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Invoice</h2>

      {/* Customer */}
      <input
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        placeholder="Customer Name"
      />

      {/* Items */}
      {items.map((item, index) => (
        <div key={item.id}>
          <input
            value={item.name}
            onChange={(e) =>
              updateItem(index, "name", e.target.value)
            }
            placeholder="Product"
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

          <button onClick={() => deleteItem(index)}>❌</button>
        </div>
      ))}

      <button onClick={addItem}>+ Add Item</button>

      <button onClick={updateInvoice}>Update Invoice</button>
    </div>
  );
}

export default EditInvoice;