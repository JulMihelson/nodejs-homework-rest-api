const { ApiError } = require("../../helpers/apiError");
const registerSchema = require("../../schemas/users");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { User } = require("../../models/users");

const emailRegExp = /^[a-z0-9]+@[a-z]+\/[a-z]{2,3}$/;

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = registerSchema.validate(req.body);
  if (error) {
    throw ApiError(400, "Mistake of Joi or other validation");
  } else {
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      throw ApiError(409, "Email already exist");
    }
    const result = await User.create({ name, email, password });
    res.status(201).json({ name: result.name, email: result.email });
  }
};
module.exports = { emailRegExp, registerUser: ctrlWrapper(registerUser) };
