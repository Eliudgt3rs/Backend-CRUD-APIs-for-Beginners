const Product = require("../models/product.model");


const getProducts = async (req, res) => {
  try {
    const product = (await Product.find({})).reverse();
    res.status(200).json(product);
    res.send("Oya, Uko fiti kabisa, server iko sawa");
    console.log("Request received at /");
  } catch (error) {
    res.status(500).json(error.message);
  }
  res.send("Product Route is working fine");
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product Created Successfully", product });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  }
}


const deleteProduct = async (req, res) => { 
    try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const updateProduct = async (req, res) => { 
    try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Updated Successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
    };