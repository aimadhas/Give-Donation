const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Organisation = require("../models/organisation");

// @desc Register a new organization
// @route POST /api/organizations/register
// @access Public
const register = asyncHandler(async (req, res) => {
  const { org_name, email, password, picture, city, address, Type, Descripion } = req.body;

  // Check if all required fields are provided
  if (!org_name || !email || !password) {
    res.status(400).send("Please provide all required fields");
    return;
  }

  // Check if the organization already exists
  const checkOrganization = await Organisation.findOne({ email });
  if (checkOrganization) {
    res.status(400).send("An organization already exists with that email");
    return;
  }

  // Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const organization = await Organisation.create({
    org_name,
    email,
    password: hashedPassword,
    picture,
    city,
    address,
    Type,
    Descripion,
  });

  if (organization) {
    res.status(201).json({ ...organization._doc, token: generateJWT(organization._id) });
  } else {
    res.status(500).send("Something went wrong");
  }
});

// @desc Authenticate an organization
// @route POST /api/organizations/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check email
  const organization = await Organisation.findOne({ email });
  if (organization && (await bcryptjs.compare(password, organization.password))) {
    res.status(201).json({
      ...organization._doc,
      token: generateJWT(organization._id),
    });
  } else {
    res.status(400).send("Invalid email or password");
  }
});

// @desc Get all organizations
// @route GET /api/organizations
// @access Private
const getAll = asyncHandler(async (req, res) => {
  const organizations = await Organisation.find({});
  res.json(organizations);
});

// @desc Get organization by ID
// @route GET /api/organizations/:id
// @access Private
const getById = asyncHandler(async (req, res) => {
  const organization = await Organisation.findById(req.params.id);
  if (organization) {
    res.json(organization);
  } else {
    res.status(404).send("Organization not found");
  }
});

// @desc Update one or many fields in an organization
// @route PUT /api/organizations/:id
// @access Private
const update = asyncHandler(async (req, res) => {
  const organization = await Organisation.findById(req.params.id);

  if (!organization) {
    res.status(404).send("Organization not found");
    return;
  }

  const { org_name, email, password, picture, city, address, Type, Descripion } = req.body;
  if (org_name) organization.org_name = org_name;
  if (email) organization.email = email;
  if (password) {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    organization.password = hashedPassword;
  }
  if (picture) organization.picture = picture;
  if (city) organization.city = city;
  if (address) organization.address = address;
  if (Type) organization.Type = Type;
  if (Descripion) organization.Descripion = Descripion;

  const updatedOrganization = await organization.save();
  res.json(updatedOrganization);
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