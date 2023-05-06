import React, {
  ReactNode,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import styles from "./MyButton.module.scss";

type MyButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default MyButton;
