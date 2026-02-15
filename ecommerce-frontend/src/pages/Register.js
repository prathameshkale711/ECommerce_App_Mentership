import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/shop.css";

export default function Register(){

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {

    if(!name || !email || !password){
      return alert("All fields are required ");
    }

    if(password.length < 6){
      return alert("Password must be at least 6 characters ");
    }

    try{

      const res = await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration Successful ");
      navigate("/");

    }catch(err){
      alert(err.response?.data || "Registration failed ");
    }

  };

  return(
    <div className="login-container">
      <div className="login-box">

        <h1 className="logo">Register</h1>

        <input 
          placeholder="Name" 
          className="input"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input 
          placeholder="Email" 
          className="input"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Password" 
          className="input"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleRegister}>
          Register
        </button>

        <p className="register">
          Already have account?{" "}
          <span onClick={()=>navigate("/")}>
            Login
          </span>
        </p>

      </div>
    </div>
  )
}
