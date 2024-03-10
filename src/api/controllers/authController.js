const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user with the plain password
    const newUser = new User({ email, password }); // No need to hash here
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Include additional user details in the response
    // Assuming 'name' field exists in your user model; adjust as needed
    const userDetails = {
      token,
      role: user.role,
      id: user._id, // Include the user ID for frontend usage
      fullName: user.name, // Adjust based on your model, e.g., user.fullName if that's the field name
      email: user.email,
    };

    res.status(200).json({ status: "success", ...userDetails });
  } catch (error) {
    // next(error)
    res.status(500).json({
      status: "error",
      message: "An error occurred during the login process.",
    });
  }
};
