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
router.get("/", listProducts);
router.post("/", createProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
