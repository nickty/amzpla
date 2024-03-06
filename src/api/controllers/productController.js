const Product = require("../models/Product");

// Get all products
exports.listProducts = async (req, res, next) => {
  console.log("request comming");
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Get a product by ID
exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Update a product
exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, price, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.bulkUploadProducts = async (req, res, next) => {
  try {
    // Parse CSV or Excel file
    // Convert data to Product models
    // Save products to database
    res.status(200).json({ message: "Products uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

exports.optimizeListing = async (req, res, next) => {
  try {
    const productId = req.params.id;
    // Analyze the product listing
    // Provide optimization suggestions
    res.json({ productId, suggestions: [] });
  } catch (error) {
    next(error);
  }
};

exports.getProductAnalytics = async (req, res, next) => {
  try {
    const productId = req.params.id;
    // Fetch and calculate analytics data
    res.json({ productId, analytics: {} });
  } catch (error) {
    next(error);
  }
};
