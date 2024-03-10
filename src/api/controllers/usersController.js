// usersController.js

const User = require("../models/User");

exports.getUserList = async (req, res, next) => {
  try {
    const { name, _sort, _order, _start, _end } = req.query;

    let filters = {};
    if (name) {
      filters.name = { $regex: name, $options: "i" };
    }
    // Sorting
    let sortOptions = {};
    if (_sort && _order) {
      sortOptions[_sort] = _order.toLowerCase() === "asc" ? 1 : -1;
    }

    // Pagination
    const limit = _end
      ? parseInt(_end, 10) - (_start ? parseInt(_start, 10) : 0)
      : undefined;
    const skip = _start ? parseInt(_start, 10) : undefined;

    const users = await User.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filters);
    res.header("X-Total-Count", total);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Update user details
exports.updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // This contains the updated user data
    // Find the user by ID and update it
    // { new: true } option returns the updated document
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the response contains an 'id' key
    const responseUser = updatedUser.toObject(); // Convert to plain object if needed
    responseUser.id = responseUser._id; // Ensure there's an 'id' field

    res.status(200).json(responseUser);
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Get single user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Find the user by ID but exclude the password field
    const user = await User.findById(id, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Delete single user by ID
exports.deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the user by ID and delete it
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

//get count of total user
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Failed to get product count:", error); // Log to console for debugging
    res
      .status(500)
      .json({ message: "Failed to get product count", error: error.message });
  }
};
