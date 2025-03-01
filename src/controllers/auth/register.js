const { User } = require("../../models/users");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const HttpError = require("../../helpers/HttpError");

const emailRegExp = /^[a-z0-9]+@[a-z]+\/[a-z]{2,3}$/;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};
module.exports = { emailRegExp, registerUser: ctrlWrapper(registerUser) };
