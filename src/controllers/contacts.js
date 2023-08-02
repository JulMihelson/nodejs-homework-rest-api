const contacts = require("../models/contacts");
const { putSchema, postSchema } = require("../schemas/contacts");
// const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const { ApiError } = require("../helpers/apiError");
const updateContact = async (req, res) => {
  const { error } = putSchema.validate(req.body);
  if (error) {
    res
      .status(400)
      .json(
        "Please fill at least one of the following fields: name, email, phone"
      );
  } else {
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (result === null) {
      res.status(404).json(result);
    } else {
      res.status(200).json(result);
    }
  }
};
const createContact = async (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    res.json("All the fields are required");
  } else {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
};
const deleteContact = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);
  result
    ? res.status(200).json("Contact was deleted")
    : throw ApiError(404, "Requested contact is not found");
};
const getContactById = async (req, res) => {
  const result = await contacts.getContactById(req.params.contactId);
  result
    ? res.status(200).json(result)
    : throw ApiError(404, "Requested contact is not found");
};
const getContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

module.exports = {
  updateContact,
  createContact,
  deleteContact,
  getContactById,
  getContacts,
};
