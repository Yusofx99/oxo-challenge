import React, { useState } from "react";
import axios from "axios";
import styles from "./DeleteVersion.module.css"; // Import the CSS module

const DeleteVersion = () => {
  const [versionId, setVersionId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();
    setMessage("");

    axios
      .delete(`http://localhost:3000/api/versions/${versionId}`)
      .then(() => {
        setMessage("Version successfully deleted.");
        setVersionId("");
      })
      .catch((error) => {
        console.error("Error deleting version", error);
        setMessage("Error deleting version. Please try again.");
      });
  };

  return (
    <div className={styles.deleteVersionContainer}>
      <form onSubmit={handleDelete} className={styles.deleteForm}>
        <input
          type="text"
          placeholder="Enter Version ID"
          value={versionId}
          onChange={(e) => setVersionId(e.target.value)}
          className={styles.deleteInput}
        />
        <button type="submit" className={styles.deleteButton}>
          Delete Version
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default DeleteVersion;
