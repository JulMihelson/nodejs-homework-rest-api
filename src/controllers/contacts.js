const contacts = require("../models/contacts");
const { putSchema, postSchema } = require("../schemas/contacts");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const { ApiError } = require("../helpers/apiError");
const updateContact = async (req, res) => {
  const { error } = putSchema.validate(req.body);
  if (error) {
    throw ApiError(400, error.message);
  } else {
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (result === null) {
      throw ApiError(404, error.message);
    }

    res.status(200).json(result);
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
  updateContact: ctrlWrapper(updateContact),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  getContactById: ctrlWrapper(getContactById),
  getContacts: ctrlWrapper(getContacts),
};
