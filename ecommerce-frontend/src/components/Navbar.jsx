import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar(){

  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); // Login page
  };

  return(
    <div className="navbar">
      <h2 onClick={()=>navigate("/home")}>ShopBox</h2>

      <div>
        <span onClick={()=>navigate("/home")}>Home</span>
        <span onClick={()=>navigate("/products")}>Products</span>
        <span onClick={()=>navigate("/cart")}>Cart</span>
        <span onClick={()=>navigate("/my-orders")}>My Orders</span>

        <span 
          onClick={handleLogout}
          style={{color:"red", fontWeight:"bold", cursor:"pointer"}}
        >
          Logout
        </span>
      </div>
    </div>
  )
}
