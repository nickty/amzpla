const Product = require('../models/Product')
const User = require('../models/User')

// Get all products
exports.listProducts = async (req, res, next) => {
  try {
    const { name, price_gte, price_lte, _sort, _order, _start, _end } =
      req.query

    let filters = {}
    if (name) {
      filters.name = { $regex: name, $options: 'i' }
    }
    if (price_gte) {
      filters.price = { ...filters.price, $gte: parseFloat(price_gte) }
    }
    if (price_lte) {
      filters.price = { ...filters.price, $lte: parseFloat(price_lte) }
    }

    // Sorting
    let sortOptions = {}
    if (_sort && _order) {
      sortOptions[_sort] = _order.toLowerCase() === 'asc' ? 1 : -1
    }

    // Pagination
    const limit = _end
      ? parseInt(_end, 10) - (_start ? parseInt(_start, 10) : 0)
      : undefined
    const skip = _start ? parseInt(_start, 10) : undefined

    const products = await Product.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    // Ensure to send back total count for pagination
    const total = await Product.countDocuments(filters)
    res.header('X-Total-Count', total)
    res.json(products)
  } catch (error) {
    next(error)
  }
}

// Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description } = req.body

    // Check if price is empty
    if (!price) {
      return res.status(400).json({ message: 'Price is required' })
    }

    // Retrieve user information from the request object
    const userId = req.user.userId

    const product = new Product({ name, price, description, user: userId })
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

// Get a product by ID
exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
}

// Update a product
exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id
    const { name, price, description } = req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description },
      { new: true }
    )
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id
    const deletedProduct = await Product.findByIdAndDelete(productId)
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    next(error)
  }
}

//get count of total product
exports.getProductCount = async (req, res) => {
  try {
    let query = {} // Initialize an empty query object

    // Fetch the user's details from the database to get the latest role
    const user = await User.findById(req.user.userId).exec() // Assuming the user ID is stored in req.user.id

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check the user's role
    if (user.role === 'admin') {
      // If the user is an admin, no need to filter products
      var count = await Product.countDocuments()
    } else {
      // If the user is not an admin, filter products by the user's ID
      query.user = req.user.userId // Use the user ID from the authentication object
      var count = await Product.countDocuments(query)
    }

    console.log('check count', count)
    res.json({ count })
  } catch (error) {
    console.error('Failed to get product count:', error) // Log to console for debugging
    res
      .status(500)
      .json({ message: 'Failed to get product count', error: error.message })
  }
}

exports.bulkUploadProducts = async (req, res, next) => {
  try {
    // Parse CSV or Excel file
    // Convert data to Product models
    // Save products to database
    res.status(200).json({ message: 'Products uploaded successfully' })
  } catch (error) {
    next(error)
  }
}

exports.optimizeListing = async (req, res, next) => {
  try {
    const productId = req.params.id
    // Analyze the product listing
    // Provide optimization suggestions
    res.json({ productId, suggestions: [] })
  } catch (error) {
    next(error)
  }
}

exports.getProductAnalytics = async (req, res, next) => {
  try {
    const productId = req.params.id
    // Fetch and calculate analytics data
    res.json({ productId, analytics: {} })
  } catch (error) {
    next(error)
  }
}
