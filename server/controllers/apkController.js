// controllers/apkController.js
const ApkModel = require("../models/ApkModel");
const scraper = require("../scraper");

async function scrapeAndSaveData(req, res) {
  try {
    // Empty the collection first
    await ApkModel.deleteMany({});

    // Fetch new data
    const data = await scraper.fetchApkData();

    // Insert the new data
    await ApkModel.insertMany(data);

    res.send("Data successfully scraped and saved to MongoDB");
    console.log("Data successfully scraped and saved to MongoDB");
  } catch (error) {
    console.error(`Error in scrapeAndSaveData: ${error.message}`);
    res.status(500).send("Error scraping and saving data");
  }
}

const getVersions = async (req, res) => {
  try {
    const versions = await ApkModel.find(
      {},
      "version releaseDate variants"
    ).exec();

    // Check if versions array is not empty
    if (!versions || versions.length === 0) {
      return res.status(404).json({ message: "No versions found" });
    }

    const versionData = versions.map((v) => ({
      versionId: v.version,
      releaseDate: v.releaseDate,
      totalVariants: v.variants ? Object.keys(v.variants).length : 0,
    }));

    res.json(versionData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVersionDetail = async (req, res) => {
  try {
    const version = await ApkModel.findOne(
      { version: req.params.versionId },
      "variants"
    ).exec();
    if (version) {
      res.json(version.variants);
    } else {
      res.status(404).json({ message: "Version not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVersion = async (req, res) => {
  try {
    const result = await ApkModel.deleteOne({
      version: req.params.versionId,
    }).exec();
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Version not found" });
    }
    res.status(200).json({ message: "Version successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVersion = async (req, res) => {
  try {
    const result = await ApkModel.findOneAndUpdate(
      { version: req.params.versionId },
      req.body,
      { new: true }
    ).exec();
    if (result) {
      res.json({
        message: "Version successfully updated",
        updatedVersion: result,
      });
    } else {
      res.status(404).json({ message: "Version not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateRequest = async (req, res) => {
  const { versionId, variantId, androidVersion, dpi } = req.body;

  if (!versionId || !variantId || !androidVersion || !dpi) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const apkEntry = await ApkModel.findOne({ version: versionId }).exec();
    if (!apkEntry) {
      return res.status(404).json({ message: "Version not found" });
    }

    let foundVariantKey = null;
    Object.keys(apkEntry.variants).forEach((key) => {
      const variant = apkEntry.variants[key];
      if (variant.variantID === variantId) {
        foundVariantKey = key;
      }
    });

    if (!foundVariantKey) {
      return res.status(404).json({ message: "Variant not found" });
    }

    const foundVariant = apkEntry.variants[foundVariantKey];
    const isCompatible =
      foundVariant.minimumAndroidVersion === androidVersion &&
      foundVariant.DPI === dpi;

    res.json({
      compatible: isCompatible,
      details: {
        requested: { version: versionId, variantID: variantId },
        available: {
          versionID: versionId,
          [foundVariantKey]: {
            variantID: foundVariant.variantID,
            architecture: foundVariant.architecture,
            minimumAndroidVersion: foundVariant.minimumAndroidVersion,
            DPI: foundVariant.DPI,
          },
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVersionInfo = async (req, res) => {
  try {
    const version = await ApkModel.findOne({
      version: req.params.versionId,
    }).exec();
    if (version) {
      res.json(version);
    } else {
      res.status(404).json({ message: "Version not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  scrapeAndSaveData,
  getVersions,
  getVersionDetail,
  deleteVersion,
  updateVersion,
  validateRequest,
  getVersionInfo,
};
