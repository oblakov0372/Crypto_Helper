import React from "react";
import styles from "./ModalWindow.module.scss";

type Props = {
  title: string;
  children?: any;
  setIsOpenModal: (state: boolean) => void;
};

const ModalWindow: React.FC<Props> = ({
  title,
  children,
  setIsOpenModal,
  ...props
}) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h3 className="text-2xl font-bold">{title}</h3>
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
