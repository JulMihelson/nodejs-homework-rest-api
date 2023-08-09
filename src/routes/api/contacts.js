const express = require("express");
const controllers = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controllers.getContacts);
router.get("/:contactId", controllers.getContactById);
router.delete("/:contactId", controllers.removeContactById);
router.post("/", controllers.createContact);
router.put("/:contactId", controllers.updateContact);
router.patch("/:contactId/favorite", controllers.checkFavourite);
module.exports = router;
