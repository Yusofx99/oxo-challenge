import React, { useState } from "react";
import axios from "axios";
import styles from "./EditVersion.module.css"; // Import the CSS module

const EditVersion = () => {
  const [versionId, setVersionId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    version: "",
    releaseDate: "",
    fileSize: "",
    downloads: "",
    variantLink: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadVersionData = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axios.get(
        `http://localhost:3000/api/versions/info/${versionId}`
      );
      setFormData(response.data);
    } catch (error) {
      setError("Error loading version data. Please check the version ID.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    axios
      .put(`http://localhost:3000/api/versions/${versionId}`, formData)
      .then(() => {
        setSuccess("Edit has been done successfully.");
      })
      .catch((error) => {
        console.error("Error updating version", error);
        setError("Edit wasn't done due to an error.");
      });
  };

  return (
    <div className={styles.editVersionContainer}>
      <h2>Edit Version</h2>
      <input
        type="text"
        value={versionId}
        onChange={(e) => setVersionId(e.target.value)}
        placeholder="Enter Version ID"
        className={styles.formInput}
      />
      <button onClick={loadVersionData} className={styles.loadButton}>
        Load
      </button>
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {success && (
        <p className={`${styles.message} ${styles.success}`}>{success}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title || ""}
            onChange={handleChange}
            className={styles.formInput}
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type || ""}
            onChange={handleChange}
            className={styles.formInput}
          />
          <input
            type="text"
            name="version"
            placeholder="Version"
            value={formData.version || ""}
            onChange={handleChange}
            className={styles.formInput}
          />
          <input
            type="text"
            name="releaseDate"
            placeholder="Release Date"
            value={formData.releaseDate || ""}
            onChange={handleChange}
            className={styles.formInput}
          />
          <input
            type="text"
            name="fileSize"
            placeholder="File Size"
            value={formData.fileSize || ""}
            onChange={handleChange}
            className={styles.formInput}
          />
          <input
            type="text"
            name="downloads"
            placeholder="Downloads"
            value={formData.downloads || ""}
            onChange={handleChange}
            className={styles.formInput}
          />
          <input
            type="text"
            name="variantLink"
            placeholder="Variant Link"
            value={formData.variantLink || ""}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit Changes
        </button>
      </form>
    </div>
  );
};

export default EditVersion;
