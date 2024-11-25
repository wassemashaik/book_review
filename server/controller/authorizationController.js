const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JS_SECRET_KEY, {
    expiresIn: process.env.EXPIRY_DAY,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newUser = await user.create({
    roles: body.roles,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  if (!newUser) {
    return next(new AppError("Failed to create the user", 400));
  }

  // it will be in javascript
  const result = newUser.toJSON();
  // we dont hav to save the password so delete that
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: "success",
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 404));
  }

  const result = await user.findOne({ where: { email } });

  const isPasswordMatched = await bcrypt.compare(password, result.password);

  if (!result || !isPasswordMatched) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken({
    id: result.id,
  });

  return res.json({
    status: "success",
    token,
  });
});

const authentication = catchAsync(async (req, res, next) => {
  //get token from headers
  let idToken = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    idToken = req.headers.authorization.split(" ")[1];
  }
  if (!idToken) {
    return next(new AppError("Please login to get access", 401));
  }
  const tokenDetail = jwt.verify(idToken, process.env.JS_SECRET_KEY);

  const freshUser = await user.findByPk(tokenDetail.id)

  if (!freshUser){
    return next(new AppError('User no longer exists', 400))
  }
  req.user = freshUser
  return next()
});

module.exports = { signup, login, authentication };
