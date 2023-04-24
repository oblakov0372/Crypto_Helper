import React, { ReactNode, AnchorHTMLAttributes } from "react";
import styles from "./MyButton.module.scss";

type MyButtonProps = {
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
  return (
    <a {...props} className={styles.button}>
      {children}
    </a>
  );
};

export default MyButton;
