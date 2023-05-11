import React from "react";
import styles from "./ModalWindow.module.scss";

const ModalWindow = ({ title, children, setIsOpenModal, ...props }: any) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button
            onClick={() => setIsOpenModal(false)}
            className={styles.closeButton}
          >
            X
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default ModalWindow;
