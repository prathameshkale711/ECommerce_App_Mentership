import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const { search } = req.query;

    let filter = {};

    if (search && search.trim() !== "") {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter);

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Error loading products" });
  }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

export default router;