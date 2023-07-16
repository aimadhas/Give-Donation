const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/users");

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const register = asyncHandler(async (req, res) => {
  const { f_name, l_name, email, password, city,photo } = req.body;
  if (!f_name || !l_name || !email || !password || !city) {
    res.status(400);
    throw new Error("Please provide valid credentials");
  }

  // Check if the user already exists
  const checkUser = await Users.findOne({ email });
  if (checkUser) {
    res.status(400);
    throw new Error("A user already exists with that email");
  }

  // Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await Users.create({ f_name, l_name, email, password: hashedPassword, city });

  if (user) {
    res.status(201).json({ ...user._doc, token: generateJWT(user._id) });
  } else {
    res.status(500).send("Something went wrong");
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check email
  const user = await Users.findOne({ email });
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.status(201).json({
      ...user._doc,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400).send("Invalid email or password");
  }
});


const getAll = asyncHandler(async (req, res) => {
  const users = await Users.find({});
  res.json(users);
});

const getById = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

const update = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const { f_name, l_name, email, password, city,photo } = req.body;
  if (f_name) user.f_name = f_name;
  if (l_name) user.l_name = l_name;
  if (email) user.email = email;
  if (photo) user.photo = photo;
  if (password) {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;
  }
  if (city) user.city = city;

  const updatedUser = await user.save();
  res.json(updatedUser);
});

// Generate JWT
function generateJWT(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = {
  register,
  login,
  getAll,
  getById,
  update,
};