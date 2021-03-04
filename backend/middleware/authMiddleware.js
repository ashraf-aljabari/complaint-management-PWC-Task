import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// checking logged in user token
// to access authorized routes.
const protected = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).isSelected('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

// checking if the user trying to
// access the admin route is verified
// as admin or not.
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as an admin');
  }
};

export { protected, admin };
