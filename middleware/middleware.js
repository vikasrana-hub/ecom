const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET|| "ecom";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader ) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token =authHeader;

  try {
    const decoded = jwt.verify(token,JWT_SECRET );
    req.user = decoded; // contains userId
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
