import React, { useState } from "react";
import axios from "axios";
import styles from "./ValidateRequest.module.css"; // Import the CSS module

const ValidateRequest = () => {
  const [versionId, setVersionId] = useState("");
  const [variantId, setVariantId] = useState("");
  const [androidVersion, setAndroidVersion] = useState("");
  const [dpi, setDpi] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setValidationResult(null); // Reset validation result

    axios
      .post("http://localhost:3000/api/validate", {
        versionId,
        variantId,
        androidVersion,
        dpi,
      })
      .then((response) => {
        setValidationResult(response.data);
      })
      .catch((error) => {
        console.error("Error validating request", error);
        setErrorMessage("Error validating request. Please check your input.");
      });
  };

  return (
    <div className={styles.validateContainer}>
      <h2>Validate Request</h2>
      <form onSubmit={handleSubmit} className={styles.validateForm}>
        <input
          type="text"
          placeholder="Version ID"
          value={versionId}
          onChange={(e) => setVersionId(e.target.value)}
          className={styles.formInput}
        />
        <input
          type="text"
          placeholder="Variant ID"
          value={variantId}
          onChange={(e) => setVariantId(e.target.value)}
          className={styles.formInput}
        />
        <input
          type="text"
          placeholder="Android Version"
          value={androidVersion}
          onChange={(e) => setAndroidVersion(e.target.value)}
          className={styles.formInput}
        />
        <input
          type="text"
          placeholder="DPI"
          value={dpi}
          onChange={(e) => setDpi(e.target.value)}
          className={styles.formInput}
        />
        <button type="submit" className={styles.submitButton}>
          Validate
        </button>
      </form>
      {errorMessage && (
        <p className={`${styles.message} ${styles.error}`}>{errorMessage}</p>
      )}
      {validationResult && (
        <div className={styles.resultContainer}>
          <h3>Validation Result:</h3>
          <pre>{JSON.stringify(validationResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ValidateRequest;
