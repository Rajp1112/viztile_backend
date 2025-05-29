const jwt = require('jsonwebtoken');
const User = require('../models/user-models');
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const jwtToken = token.replace('Bearer ', '');
  // console.log(jwtToken);
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: decoded.email }).select({
      password: 0,
    });
    // console.log('User:', userData);
    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {
    // console.error(error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
