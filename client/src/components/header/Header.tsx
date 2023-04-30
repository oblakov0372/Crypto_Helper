import styles from "./Header.module.scss";
import logo from "../../assets/img/logo_symbol_transparent.png";
import telegramPng from "../../assets/icons/telegram.png";
import { useEffect, useState } from "react";
import DropDownMenu from "../Helpers/dropDownMenu/DropDownMenu";
import { Link } from "react-router-dom";
import { ServiceType } from "../../types/ServiceType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { login, logout } from "../../redux/slices/auth";
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.authSlice.isLoggedIn
  );

  const onClickLogout = () => {
    setIsDropDownAccountOpen(false);
    dispatch(logout());
  };

  const [isDropDownServicesOpen, setIsDropDownServicesOpen] =
    useState<boolean>(false);

  const [isDropDownAccountOpen, setIsDropDownAccountOpen] =
    useState<boolean>(false);

  const services: ServiceType[] = [
    { link: "/cryptocurrencies", name: "Cryptocurrencies" },
    { link: "/tradesTracker", name: "Trades Tracker" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      console.log(123);
      dispatch(login(token));
    }
  }, []);

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <div className={styles.logo}>
          <img src={logo} alt="Crypto_0372" />
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
                  <li>
                    <Link
                      onClick={() => setIsDropDownServicesOpen(false)}
                      key={index}
                      to={service.link}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </DropDownMenu>
          </li>
        </ul>
      </div>
      <div className={styles.header__right}>
        <ul>
          {isLoggedIn ? (
            <li>
              <DropDownMenu
                isMenuOpen={isDropDownAccountOpen}
                setIsMenuOpen={setIsDropDownAccountOpen}
                title="Account"
              >
                <ul>
                  <>
                    <li onClick={() => setIsDropDownAccountOpen(false)}>
                      <Link to={"/profile"}>Profile</Link>
                    </li>
                    <li onClick={() => onClickLogout()}>
                      <a>Logout</a>
                    </li>
                  </>
                </ul>
              </DropDownMenu>
            </li>
          ) : (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
