import jwt from "jsonwebtoken";

export default function authMiddleware(req,res,next){

  const authHeader = req.headers.authorization;

  // 🔥 log always pahije
  console.log("AUTH HEADER:", authHeader);

  if(!authHeader){
    return res.status(401).json({message:"No token"});
  }

  const token = authHeader.split(" ")[1];

  try{

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    console.log("DECODED:", decoded); // 🔥 add this

    req.user = decoded;

    next();

  }catch(err){

    console.log("JWT ERROR:", err.message); // 🔥 important

    return res.status(401).json({message:"Invalid token"});

  }

}