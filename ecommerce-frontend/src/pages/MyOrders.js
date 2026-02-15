import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";
import "../styles/shop.css";

export default function MyOrders(){

  const [orders,setOrders] = useState([]);

  useEffect(()=>{
    loadOrders();
  },[]);

  const loadOrders = async()=>{
    const res = await API.get("/orders/my-orders");
    setOrders(res.data);
  };

  const cancelOrder = async(id)=>{
    await API.put(`/orders/cancel/${id}`);
    alert("Order Cancelled ");
    loadOrders();
  };

  return(
    <>
      <Navbar/>

      <div className="page">
        <h1>My Orders </h1>

        {orders.length === 0 ? (
          <h3>No Orders Yet</h3>
        ) : (
          orders.map(order=>(
            <div key={order._id} className="cart-box">

              <div>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>

                <h4>Items:</h4>

                {order.items.map((item,index)=>(
                  <div key={index} style={{marginBottom:"10px"}}>
                    <p>
                      {item.productId?.name} × {item.quantity}
                    </p>
                  </div>
                ))}

                
                {order.status !== "cancelled" &&
                 order.status !== "delivered" && (
                  <button
                    style={{background:"red", marginTop:"10px"}}
                    onClick={()=>cancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                )}

              </div>

            </div>
          ))
        )}
      </div>
    </>
  );
}
