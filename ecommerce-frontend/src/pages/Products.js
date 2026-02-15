import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../api";
import "../styles/products.css";

export default function Products(){

  const [products,setProducts] = useState([]);
  const [search,setSearch] = useState("");
  const [maxPrice,setMaxPrice] = useState("");
  const [sort,setSort] = useState("");

  useEffect(()=>{
    loadProducts();
  },[search,maxPrice,sort]);

  const loadProducts = async()=>{
    try{
      const res = await API.get("/products",{
        params:{
          search,
          maxPrice,
          sort
        }
      });

      setProducts(res.data);

    }catch(err){
      alert("Error loading products ");
    }
  };

  const addToCart = async (id)=>{
    try{

      await API.post("/cart/add",{
        productId:id,
        quantity:1
      });

      alert("Added to Cart ");

    }catch(err){
      alert("Please login first ");
    }
  };

  return(
    <>
      <Navbar/>

      <div className="page">

      
        <div className="search" style={{marginBottom:"30px"}}>
          
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e)=>setMaxPrice(e.target.value)}
          />

          <select onChange={(e)=>setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>

        </div>

     
        <div className="cards">

          {products.length === 0 ? (
            <h3>No Products Found</h3>
          ) : (
            products.map((item)=>(
              <div className="card" key={item._id}>

                {item.image ? (
                  <img
                      src={`http://localhost:5000/uploads/${item.image}`} 
                    alt={item.name}
                    style={{
                      height:"150px",
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

                <button onClick={() => addToCart(item._id)}>
                  Add To Cart
                </button>

              </div>
            ))
          )}

        </div>

      </div>
    </>
  );
}
