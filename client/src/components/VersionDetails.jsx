import React, { useState } from "react";
import axios from "axios";
import styles from "./VersionDetails.module.css"; // Import the CSS module

const VersionDetails = () => {
  const [versionId, setVersionId] = useState("");
  const [versionDetails, setVersionDetails] = useState(null);
  const [error, setError] = useState("");

  const fetchVersionDetails = async () => {
    setError("");
    setVersionDetails(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/versions/${versionId}`
      );
      setVersionDetails(response.data);
    } catch (err) {
      setError("Version not found or error fetching version details");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVersionDetails();
  };

  return (
    <div className={styles.versionDetailsContainer}>
      <h2>Version Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={versionId}
          onChange={(e) => setVersionId(e.target.value)}
          placeholder="Enter Version ID"
          className={styles.formInput}
        />
        <button type="submit" className={styles.submitButton}>
          Get Details
        </button>
      </form>
      {error && <p className={`${styles.error}`}>{error}</p>}
      {versionDetails && (
        <div className={styles.versionInfo}>
          <p>Version ID: {versionId}</p>
          {Object.entries(versionDetails).map(([variantKey, variant]) => (
            <div key={variantKey} className={styles.variantDetails}>
              <h4>{variantKey}</h4>
              <p>Variant ID: {variant.variantID}</p>
              <p>Architecture: {variant.architecture}</p>
              <p>Minimum Android Version: {variant.minimumAndroidVersion}</p>
              <p>DPI: {variant.DPI}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VersionDetails;
