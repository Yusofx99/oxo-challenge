// app.js
const express = require("express");
const mongoose = require("mongoose");
const apkRouter = require("./routes/router");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 3000;
const mongoURI =
  "mongodb+srv://yusof:O9znrnLgRnljtIX6@cluster0.q0hdtyi.mongodb.net/oxotech"; // Replace with your MongoDB URI

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", apkRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
