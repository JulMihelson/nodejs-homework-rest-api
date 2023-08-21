const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const contactsRouter = require("./src/routes/api/contacts");
const authRouter = require("./src/routes/api/users");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

require("dotenv").config();

const { DB_HOST } = process.env;
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

const avatars = [];

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const avatarsDir = path.join(__dirname, "public", "avatars");

app.post("/api/avatars", upload.single("avatar"), async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  console.log(req.file);
  console.log(req.body);
  const resultUpload = path.join(avatarsDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const cover = path.join("avatars", originalname);
  const newAvatar = {
    id: nanoid(),
    ...req.body,
    avatar,
  };
  avatars.push(newAvatar);
  res.status(201).json(newAvatar);
});

app.get("/api/avatars", async (req, res) => {
  res.json(avatars);
});

app.listen(4000);

module.exports = app;
