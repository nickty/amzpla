const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as "Bearer <token>"
  console.log("is there any request");
  if (!token) {
    return res
      .status(403)
      .json({ message: "Authentication token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adding the decoded user to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
