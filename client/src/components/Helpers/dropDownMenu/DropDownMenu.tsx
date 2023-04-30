import React, { useState, useEffect, useRef } from "react";
import styles from "./DropDownMenu.module.scss";

type Props = {
  title: string;
  children: any;
  isMenuOpen: boolean;
  setIsMenuOpen: (status: boolean | any) => void;
};

const DropDownMenu: React.FC<Props> = ({
  title,
  children,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <>
      <div
        className={styles.button}
        onClick={() => setIsMenuOpen((prev: boolean) => !prev)}
      >
        <a>{title}</a>
      </div>

      {isMenuOpen && <div className={styles.dropdownMenu}>{children}</div>}
    </>
  );
};

export default DropDownMenu;
