import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const user = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(404).json({
          status: 'error',
          message: 'No user found with this ID',
        });
      }

      // Call next middleware
      next();
    } catch (error) {
      console.error('Error while verifying token:', error.message);

      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired token, please log in again',
      });
    }
  } else {
    // Handle missing token
    return res.status(401).json({
      status: 'error',
      message: 'Authorization token is required',
    });
  }
};

export default { user };
