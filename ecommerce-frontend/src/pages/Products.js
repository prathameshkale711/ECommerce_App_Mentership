import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../api";
import "../styles/products.css";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH FILTER
  let filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // SORT PRICE
  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  // PAGINATION LOGIC
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const addToCart = async (id) => {
  try {
    await API.post("/cart/add", {
      productId: id,
      quantity: 1,
    });

    alert("Added to Cart ✅");

  } catch (err) {
    if (err.response?.status === 401) {
      alert("Please login first");
    } else {
      console.log(err);
      alert("Error adding to cart");
    }
  }

};
  return (
    <>
      <Navbar />

      <div className="page">

        {/* SEARCH + SORT */}
        <div className="search" style={{ marginBottom: "30px" }}>
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>
        </div>

        {/* PRODUCTS */}
        <div className="cards">

          {currentProducts.length === 0 ? (
            <h3>No Products Found</h3>
          ) : (
            currentProducts.map((item) => (
              <div className="card" key={item._id}>

                {item.image ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`}
                    alt={item.name}
                    style={{
                      height: "150px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px"
                    }}
                  />
                ) : (
                  <div>No Image</div>
                )}

                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                <p>
                  ⭐ {item.rating} ({item.reviews} reviews)
                </p>

                <button onClick={() => addToCart(item._id)}>
                  Add To Cart
                </button>

              </div>
            ))
          )}

        </div>

        {/* PAGINATION */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>

          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ marginRight: "10px" }}
          >
            Prev
          </button>

          <span style={{ marginRight: "10px" }}>
            Page {currentPage}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastProduct >= filteredProducts.length}
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}