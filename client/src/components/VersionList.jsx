import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./VersionList.module.css"; // Import the CSS module

const VersionList = () => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/versions")
      .then((response) => {
        setVersions(response.data);
      })
      .catch((error) => console.error("Error fetching versions", error));
  }, []);

  return (
    <div className={styles.versionListContainer}>
      <h2 className={styles.versionTitle}>Version List</h2>
      <ul className={styles.versionList}>
        {versions.map((version) => (
          <li key={version.versionId} className={styles.versionItem}>
            <div>
              <p>
                <strong>Version ID:</strong> {version.versionId}
              </p>
              <p>
                <strong>Release Date:</strong> {version.releaseDate}
              </p>
              <p>
                <strong>Total Variants:</strong> {version.totalVariants}
              </p>
            </div>
            <div className={styles.versionDetails}>
              {version.variants && (
                <details className={styles.variantDetails}>
                  <summary className={styles.detailsSummary}>
                    View Variants
                  </summary>
                  {Object.entries(version.variants).map(([key, variant]) => (
                    <div key={key}>
                      <p>
                        <strong>{key}</strong>
                      </p>
                      <p>Variant ID: {variant.variantID}</p>
                      <p>Architecture: {variant.architecture}</p>
                      <p>
                        Minimum Android Version: {variant.minimumAndroidVersion}
                      </p>
                      <p>DPI: {variant.DPI}</p>
                    </div>
                  ))}
                </details>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VersionList;
