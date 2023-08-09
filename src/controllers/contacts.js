const { ApiError } = require("../helpers/apiError");
const {
  Schema,
  model,
  patchFavouriteSchema,
  postSchema,
  putSchema,
} = require("mongoose");
const ctrlWrapper = require("../helpers/ctrlWrapper");
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
  favourite: {
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
    throw ApiError(404, error.message);
  }
  res.json({ message: "Deleted successfully" });
};

const createContact = async (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    res.json("All the fields are required");
  } else {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { error } = putSchema.validate(req.body);
  if (error) {
    throw ApiError(400, error.message);
  } else {
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (result === null || !result) {
      throw ApiError(404, error.message);
    }

    res.status(201).json(result);
  }
};

const checkFavourite = async (req, res) => {
  const { error } = patchFavouriteSchema.validate(req.body);
  if (error) {
    throw ApiError(400, "Missing field favorite");
  } else {
    const result = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body
    );
    if (result === null) {
      throw ApiError(404, error.message);
    } else {
      switch (result.favourite) {
        case true:
          res.status(200).json("Contact added as favourite");
          break;
        case false:
          res.status(200).json("Contact removed from favourite");
          break;
        default:
          res.status(200).json("Favorite contact has been updated");
      }
    }
  }
};

module.exports = {
  Contact,
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContactById: ctrlWrapper(removeContactById),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  checkFavourite: ctrlWrapper(checkFavourite),
};
