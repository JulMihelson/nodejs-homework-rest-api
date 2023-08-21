const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const emailRegExp = /^[a-z0-9]+@[a-z]+\/[a-z]{2,3}$/;
const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: emailRegExp,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  token: String,
});

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

module.exports = {
  User,
  //   userSchema,
};
