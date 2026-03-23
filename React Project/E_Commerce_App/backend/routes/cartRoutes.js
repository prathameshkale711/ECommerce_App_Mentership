import express from "express";
const router = express.Router();

import Cart from "../models/Cart.js";
import authMiddleware from "../middleware/authMiddleware.js";


// GET CART
router.get("/", authMiddleware, async (req,res)=>{
  try{

    const cart = await Cart.find({ userId:req.user.id })
      .populate("productId");

    res.json(cart);

  }catch(error){
    console.log(error);
    res.status(500).json({message:"Server error"});
  }
});


// ADD TO CART
router.post("/add", authMiddleware, async (req,res)=>{
  try{

    const {productId, quantity} = req.body;

    const existing = await Cart.findOne({
      userId:req.user.id,
      productId
    });

    if(existing){
      existing.quantity += quantity || 1;
      await existing.save();
      return res.json(existing);
    }

    const item = await Cart.create({
      userId:req.user.id,
      productId,
      quantity:quantity || 1
    });

    res.json(item);

  }catch(error){
    console.log(error);
    res.status(500).json({message:"Server error"});
  }
});

export default router;