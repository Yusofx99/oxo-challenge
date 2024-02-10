// scraper.js
const axios = require("axios");
const cheerio = require("cheerio");

const APK_MIRROR_URL =
  "https://www.apkmirror.com/apk/instagram/instagram-instagram/";

async function loadWebPage(url) {
  const response = await axios.get(url);
  return response.data;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseTitle(fullTitle) {
  const versionRegex = /(\d+\.\d+\.\d+\.\d+\.\d+)/;
  const versionMatch = fullTitle.match(versionRegex);
  const version = versionMatch ? versionMatch[0] : "Unknown";

  let type = "regular";
  if (fullTitle.includes("alpha")) {
    type = "alpha";
  } else if (fullTitle.includes("beta")) {
    type = "beta";
  }

  return { type, version };
}

function extractInstagramApkData(html) {
  const $ = cheerio.load(html);
  const apkEntries = [];

  $(".appRow").each((_, appRow) => {
    const fullTitle = $(appRow).find(".appRowTitle").text().trim();
    const releaseDate = $(appRow).find(".dateyear_utc").first().text().trim();
    const infoSlide = $(appRow).next(".infoSlide");
    const fileSize = infoSlide
      .find("p:contains('File size') .infoSlide-value")
      .text()
      .trim();
    const downloads = infoSlide
      .find("p:contains('Downloads') .infoSlide-value")
      .text()
      .trim();
    const variantLink = $(appRow).find(".appRowVariantTag a").attr("href");

    if (fullTitle.includes("Instagram") && releaseDate) {
      const { type, version } = parseTitle(fullTitle);
      const apkEntry = {
        title: fullTitle,
        type,
        version,
        releaseDate,
        fileSize,
        downloads,
        variantLink,
      };
      apkEntries.push(apkEntry);
    }
  });

  return apkEntries;
}

async function fetchVariantDetails(apkEntry) {
  const variantDetailsUrl = `https://www.apkmirror.com${apkEntry.variantLink}`;
  try {
    await sleep(5000); // Waits for 5 seconds between requests

    const html = await loadWebPage(variantDetailsUrl);
    const $ = cheerio.load(html);

    apkEntry.variants = {}; // Initialize variants object

    $(".variants-table .table-row").each((index, element) => {
      if (index === 0) return; // Skip the header row

      const variantID = $(element)
        .find(".table-cell .colorLightBlack")
        .first()
        .text()
        .trim()
        .match(/\d+/)[0];
      const architecture = $(element).find(".table-cell").eq(1).text().trim();
      const minAndroidVersion = $(element)
        .find(".table-cell")
        .eq(2)
        .text()
        .trim();
      const dpi = $(element).find(".table-cell").eq(3).text().trim();

      apkEntry.variants[`variant-${index}`] = {
        variantID,
        architecture,
        minimumAndroidVersion: minAndroidVersion,
        DPI: dpi,
      };
    });
  } catch (error) {
    console.error(`Error fetching variant details: ${error.message}`);
  }
}

async function fetchApkData() {
  try {
    const html = await loadWebPage(APK_MIRROR_URL);
    const apkEntries = extractInstagramApkData(html);
    for (const apkEntry of apkEntries) {
      await fetchVariantDetails(apkEntry);
    }
    return apkEntries;
  } catch (error) {
    console.error(`Error fetching APK data: ${error.message}`);
    return null;
  }
}

module.exports = {
  fetchApkData,
};
