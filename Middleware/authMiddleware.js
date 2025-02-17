const jwt =require('jsonwebtoken')
const User = require('../Models/authModel')



const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
 
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from the decoded token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // if (req.path === '/register' || req.path === '/login') {
    //     return next(); // Skip middleware for these routes
    //   }       

    // Attach user to the request object
    req.user = user;  
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};


const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};



module.exports = {roleMiddleware, authMiddleware}