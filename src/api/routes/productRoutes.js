const express = require("express");
const router = express.Router();
const {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authenticate = require("../middlewares/authenticate");

// Applying the authentication middleware to product routes
router.get("/", authenticate, listProducts);
router.post("/", authenticate, createProduct);
router.get("/:id", authenticate, getProduct);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

module.exports = router;
