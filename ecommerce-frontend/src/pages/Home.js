import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/shop.css";

export default function Home(){

  const [products,setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    loadProducts();
  },[]);

  const loadProducts = async()=>{
    try{
      const res = await API.get("/products");
      setProducts(res.data);
    }catch(err){
      console.log(err);
    }
  };

  return(
    <>
      <Navbar/>

      <div className="page">

        <h1>Featured Products 🛍</h1>

        <div className="cards">

          {products.map((item)=>(
            <div 
              className="card" 
              key={item._id}
              onClick={()=>navigate("/products")}
            >

      
              {item.image ? (
                <img
              src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`}

                  alt={item.name}
                  style={{
                    height:"180px",
                    width:"100%",
                    objectFit:"cover",
                    borderRadius:"8px",
                    marginBottom:"10px"
                  }}
                />
              ) : (
                <div className="img">No Image</div>
              )}

              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}
