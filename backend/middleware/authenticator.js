const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and has a Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database
    const user = await User.findById(decoded.id).select('-password');

    // If user not found, reject
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or controller
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;
