import React from "react";
import styles from "./Footer.module.scss";
import logo from "../../assets/img/logo_symbol_transparent.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <img src={logo} alt="Crypto_0372" />
        <h2>Crypto_0372</h2>
      </div>
    </div>
  );
};

export default Footer;
