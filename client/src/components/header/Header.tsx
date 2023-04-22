import styles from "./Header.module.scss";
import logo from "../../assets/img/logo_symbol_transparent.png";
import telegramPng from "../../assets/icons/telegram.png";
import { useState } from "react";
import DropDownMenu from "../Helpers/dropDownMenu/DropDownMenu";
import { Link } from "react-router-dom";
import { ServiceType } from "../../types/ServiceType";
const Header = () => {
  const [isDropDownServicesOpen, setIsDropDownServicesOpen] =
    useState<boolean>(false);

  const services: ServiceType[] = [
    { link: "/cryptocurrencies", name: "Cryptocurrencies" },
    { link: "/tradesTracker", name: "Trades Tracker" },
  ];

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <div className={styles.logo}>
          <img src={logo} alt="Crypto_0372" height={50} />
          <h2>Crypto_0372</h2>
        </div>
      </Link>
      <div className={styles.navigation}>
        <ul className={styles.navigationUl}>
          <li>
            <Link to={"/platforms"}>Tools</Link>
          </li>
          <li>
            <DropDownMenu
              isMenuOpen={isDropDownServicesOpen}
              setIsMenuOpen={setIsDropDownServicesOpen}
              title="Services"
            >
              <ul>
                {services.map((service: ServiceType, index: number) => (
                  <Link
                    onClick={() => setIsDropDownServicesOpen(false)}
                    key={index}
                    to={service.link}
                  >
                    <li>{service.name}</li>
                  </Link>
                ))}
              </ul>
            </DropDownMenu>
          </li>
        </ul>
      </div>
      <div className={styles.socialMedia}>
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
