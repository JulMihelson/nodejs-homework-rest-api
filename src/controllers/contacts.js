const { ApiError } = require("../helpers/apiError");
const { Schema, model } = require("mongoose");
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
const Contact = model("contact", contactSchema);

const getContacts = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id });
  console.log(id);
  if (!result) {
    throw ApiError(404);
  }
  res.json(result);
};

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw ApiError(404);
  }
  res.json({ message: "Deleted successfully" });
};
const createContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw ApiError(404, "Not Found");
  }
  res.status(201).json(result);
};
const checkFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.status(201).json(result);
};
module.exports = {
  Contact,
  getContacts,
  getContactById,
  removeContactById,
  createContact,
  updateContact,
  checkFavorite,
};
