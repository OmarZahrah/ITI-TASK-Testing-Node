const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const APIError = require("../utilities/errors");

const getAllUsers = async (_req, res, _next) => {
  let users = await userModel.find();
  res.status(200).json({ data: users });
};

const saveUser = async (req, res, _next) => {
  const user = req.body;
  
  const userExists = await userModel.findOne({ email: user.email });
  if (userExists) throw new APIError(400, "email is already exists");

  const newUser = await userModel.create(user);
  res.status(201).json({ data: newUser });
};

const getUserById = async (req, res, _next) => {
  let user = await userModel.findOne({ _id: req.params.id });
  if (user) res.status(200).json({ data: user });
  else throw new APIError(404, "there is no user with this id");
};

const login = async (req, res, _next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new APIError(400, "please provide email and password");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new APIError(401, "Invalid email or password");
  }
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new APIError(401, "Invalid email or password");
  }

  const token = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET);
  res.status(200).json({ data: token });
};

//lab
const getUserByName = async (req, res, _next) => {
  const { name } = req.query;
  const user = await userModel.findOne({ name });
  if (user) res.status(200).json({ data: user });
  else {
    res.status(404).json({ message: "There is no user with name: " + name });
  }
};

const deleteAllUsers = async (req, res, _next) => {
  await userModel.deleteMany();
  res.status(200).json({ message: "users have been deleted successfully" });
};

module.exports = {
  saveUser,
  getAllUsers,
  getUserByName,
  deleteAllUsers,
  getUserById,
  login,
};
