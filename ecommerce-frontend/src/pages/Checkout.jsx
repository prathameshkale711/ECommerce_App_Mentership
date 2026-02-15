import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/checkout.css";

export default function Checkout() {

  const [cart,setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    loadCart();
  },[]);

  const loadCart = async()=>{
    const res = await API.get("/cart");
    setCart(res.data);
  };

  const total = cart.reduce((sum,item)=>{
    return sum + item.quantity * (item.productId?.price || 0);
  },0);

  const confirmOrder = async()=>{
    await API.post("/orders/place");
    alert("Order Placed Successfully ✅");
    navigate("/my-orders");
  };

  return(
    <>
      <Navbar/>

      <div className="checkout-page">

        <div className="summary-box">
          <h3>Order Summary</h3>

          {cart.map(item=>(
            <div key={item._id} className="cart-box">

              {item.productId?.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.productId.image}`}
                  alt=""
                  style={{
                    height:"80px",
                    width:"80px",
                    objectFit:"cover",
                    borderRadius:"8px",
                    marginRight:"15px"
                  }}
                />
              )}

              <div>
                <p>{item.productId?.name}</p>
                <p>₹{item.productId?.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>

            </div>
          ))}

          <h3>Total ₹{total}</h3>
        </div>

        <button className="confirm-btn" onClick={confirmOrder}>
          Confirm Order
        </button>

      </div>
    </>
  );
}
