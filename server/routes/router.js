// routes/router.js
const express = require("express");
const apkController = require("../controllers/apkController");

const router = express.Router();

router.get("/scrape", apkController.scrapeAndSaveData);
router.get("/versions", apkController.getVersions);
router.get("/versions/:versionId", apkController.getVersionDetail);
router.delete("/versions/:versionId", apkController.deleteVersion);
router.put("/versions/:versionId", apkController.updateVersion);
router.post("/validate", apkController.validateRequest);
router.get("/versions/info/:versionId", apkController.getVersionInfo);

module.exports = router;
