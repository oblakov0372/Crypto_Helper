import classes from "./Header.module.scss";
import logo from "../../assets/img/logo_symbol_transparent.png";
import telegramPng from "../../assets/icons/telegram.png";
import { useState } from "react";
import DropDownMenu from "../Helpers/dropDownMenu/DropDownMenu";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={classes.header}>
      <Link to={"/"}>
        <div className={classes.logo}>
          <img src={logo} alt="Crypto_0372" height={50} />
          <h2>Crypto_0372</h2>
        </div>
      </Link>
      <div className={classes.navigation}>
        <ul className={classes.navigationUl}>
          <li>
            <Link to={"/platforms"}>Tools</Link>
          </li>
          <li>
            <DropDownMenu title="Services">
              <ul>
                <Link to={"/volumes"}>
                  <li>Volumes</li>
                </Link>
                <Link to={"/service2"}>
                  <li>Service2</li>
                </Link>
              </ul>
            </DropDownMenu>
          </li>
        </ul>
      </div>
      <div className={classes.socialMedia}>
        <ul>
          <li>
            <a href="https://t.me/CryptoOblakov_0372" target="_blank">
              <img src={telegramPng} alt="telegramChanel" width={30} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
