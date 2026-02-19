import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/cart.css";

export default function Cart(){

  const [cart,setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    loadCart();
  },[]);

  const loadCart = async()=>{
    try{
      const res = await API.get("/cart");
      setCart(res.data);
    }catch(err){
      console.log(err);
    }
  };

  const increase = async (item)=>{
    await API.put(`/cart/${item._id}`,{
      quantity:item.quantity + 1
    });
    loadCart();
  };

  const decrease = async (item)=>{
    if(item.quantity <= 1) return;

    await API.put(`/cart/${item._id}`,{
      quantity:item.quantity - 1
    });
    loadCart();
  };

  const removeItem = async(id)=>{
    await API.delete(`/cart/${id}`);
    loadCart();
  };

  const total = cart.reduce((sum,item)=>{
    return sum + item.quantity * (item.productId?.price || 0);
  },0);

  return(
    <>
      <Navbar/>

      <div className="cart-page">

        {cart.length === 0 ? (
          <h2 style={{textAlign:"center"}}>Your Cart is Empty 🛒</h2>
        ) : (
          <>
            {cart.map(item=>(
  <div className="cart-box" key={item._id}>

   
    <div className="cart-left">
      {item.productId?.image && (
        <img
        src={`${process.env.REACT_APP_API_URL}/uploads/${item.productId.image}`}

          alt=""
          className="cart-image"
        />
      )}
    </div>

    
    <div className="cart-right">
      <h3>{item.productId?.name}</h3>
      <p className="price">₹{item.productId?.price}</p>

      <div className="qty">
        <button onClick={()=>decrease(item)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={()=>increase(item)}>+</button>
      </div>

      <button className="remove-btn"
        onClick={()=>removeItem(item._id)}>
        Remove
      </button>
    </div>

  </div>
))}


            <div className="checkout-row">
              <h3>Total ₹{total}</h3>

              <button onClick={()=>navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}

      </div>
    </>
  );
}
