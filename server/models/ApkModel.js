// models/ApkModel.js
const mongoose = require("mongoose");

const apkSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    version: String,
    releaseDate: String,
    fileSize: String,
    downloads: String,
    variantLink: String,
    variants: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApkModel", apkSchema);
