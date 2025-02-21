const roleAuth = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming user data is attached to the request after authentication
  
      if (userRole !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: `Access denied. You must be a ${requiredRole} to perform this action.`,
        });
      }
  
      next(); // Allow access if the role matches
    };
  };
  
  module.exports = roleAuth;