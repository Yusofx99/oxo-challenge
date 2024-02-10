import React, { useState } from "react";
import axios from "axios";
import styles from "./StartScraping.module.css"; // Import the CSS module

const StartScraping = () => {
  const [message, setMessage] = useState("");
  const [isScraping, setIsScraping] = useState(false);

  const handleStartScraping = () => {
    setIsScraping(true);
    setMessage("Scraping in progress...");

    axios
      .get("http://localhost:3000/api/scrape")
      .then((response) => {
        setIsScraping(false);
        setMessage("Scraping completed successfully!");
        console.log("Scraping started:", response);
      })
      .catch((error) => {
        setIsScraping(false);
        setMessage("Error starting scraping. Please try again.");
        console.error("Error starting scraping", error);
      });
  };

  return (
    <div className={styles.scrapingButtonContainer}>
      <button
        onClick={handleStartScraping}
        className={styles.scrapingButton}
        disabled={isScraping}
      >
        Start Scraping
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StartScraping;
