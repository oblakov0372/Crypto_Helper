import React, { useState, useRef, useEffect } from "react";
import classes from "./DropDownMenu.module.scss";

type Props = {
  title: string;
  items: string[];
};

const DropDownMenu: React.FC<Props> = ({ title, items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: string) => {
    console.log(`Selected item: ${item}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        className={classes.button}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <a>{title}</a>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#fff"
          />
        </svg>
      </div>

      {isMenuOpen && (
        <div className={classes.dropdownMenu} ref={dropdownRef}>
          <ul>
            {items.map((i: string) => (
              <li key={i} onClick={() => handleItemClick(i)}>
                {i}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
