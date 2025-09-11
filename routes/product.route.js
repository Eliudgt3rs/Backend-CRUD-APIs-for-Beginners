const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const { getProducts, getProduct,addProduct,deleteProduct, updateProduct } = require("../controllers/product.controller.js");

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router;