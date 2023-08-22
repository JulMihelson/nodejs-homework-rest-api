const express = require("express");
const { controllers } = require("../../controllers/auth/register");
const schemas = require("../../schemas/users");
const validateBody = require("../../middlewares/auth/validateBody");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const ctrl = require("../../controllers/auth/register");
const router = express.Router();
// const { registerUser } = require("../../controllers/auth/register");
// const { login } = require("../../controllers/auth/login");
const auth = require("../../middlewares/auth/auth");
const upload = require("../../middlewares/uploadAvatar");

// signin
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

// signup
router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.registerUser)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
