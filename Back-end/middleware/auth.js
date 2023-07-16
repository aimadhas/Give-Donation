const jwt = require('jsonwebtoken');
const Organisation = require('../models/organisation');
const asyncHandler = require("express-async-handler");
const Users = require("../models/users");



const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // ! Get Token from the headers
      token = req.headers.authorization.split(" ")[1];

      // !  verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ! get User form the token
      req.user = await Users.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error(err.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
})



const OrgAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const organisation = await Organisation.findOne({ _id: decoded.id, 'tokens.token': token });
    if (!organisation) {
      throw new Error('Not authorized to create events.', decoded.id , token , organisation)
    }
    req.organisation = organisation;
    next();
  } catch (error) {
    res.status(401).send({ error: 'another problem (maybe ur not logged in)' });   
  }
};

module.exports = {OrgAuth , protectRoute} ;