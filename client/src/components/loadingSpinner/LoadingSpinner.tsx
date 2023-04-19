import React from "react";
import styles from "./LoadingSpinner.module.scss";
const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};

export default LoadingSpinner;
