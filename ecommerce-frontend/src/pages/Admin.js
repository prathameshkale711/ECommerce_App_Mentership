import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";
import "../styles/admin.css";
export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  //  DELETE ORDER
  const deleteOrder = async (id) => {
    try {
      await API.delete(`/admin/order/${id}`);
      alert("Order Deleted ");
      fetchAll();
    } catch (error) {
      console.log(error);
      alert("Error deleting order");
    }
  };

  const fetchAll = async () => {
    const p = await API.get("/admin/inventory");
    const o = await API.get("/admin/orders");
    const r = await API.get("/admin/returns");

    setProducts(p.data);
    setOrders(o.data);
    setReturns(r.data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await API.put(`/admin/product/${editId}`, {
        name,
        price,
        stock,
      });
      alert("Updated ");
      setEditId(null);
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("image", image);

      await API.post("/admin/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Added ");
    }

    setName("");
    setPrice("");
    setStock("");
    setImage(null);

    fetchAll();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/admin/product/${id}`);
    fetchAll();
  };

  const approveReturn = async (id) => {
    await API.put(`/admin/returns/${id}`);
    fetchAll();
  };

  const editProduct = (p) => {
    setEditId(p._id);
    setName(p.name);
    setPrice(p.price);
    setStock(p.stock);
  };

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Admin Dashboard ⚙</h1>

        {/* ADD / UPDATE */}
        <h2>{editId ? "Update Product" : "Add Product"}</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        {!editId && (
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        )}

        <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>

        {/* INVENTORY */}
        <h2>Inventory</h2>
        {products.map((p) => (
          <div key={p._id} className="cart-box">
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              style={{ height: "60px" }}
              alt=""
            />
            <div>
              <p>{p.name}</p>
              <p>₹{p.price}</p>
              <p>Stock: {p.stock}</p>
            </div>

            <div>
              <button onClick={() => editProduct(p)}>Edit</button>
              <button
                style={{ background: "red" }}
                onClick={() => deleteProduct(p._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* ORDERS */}
        <h2>Orders</h2>

        {orders.map((o) => (
          <div key={o._id} className="cart-box">
            <div>
              <p>User: {o.userId?.email}</p>
              <p>Total: ₹{o.total}</p>
              <p>Status: {o.status}</p>
            </div>

            <button
              style={{ background: "red" }}
              onClick={() => deleteOrder(o._id)}
            >
              Delete Order
            </button>
          </div>
        ))}

        {/* RETURNS */}
        <h2>Return Requests</h2>
        {returns.map((r) => (
          <div key={r._id} className="cart-box">
            <div>
              <p>User: {r.userId?.email}</p>
              <p>Product: {r.productId?.name}</p>
              <p>Status: {r.status}</p>
            </div>

            {r.status === "pending" && (
              <button
                style={{ background: "green" }}
                onClick={() => approveReturn(r._id)}
              >
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
