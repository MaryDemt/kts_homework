import React from "react";

import { BagIcon } from "@components/icons/BagIcon";
import { MainLogo } from "@components/icons/HeaderLogo";
import { UserIcon } from "@components/icons/UserIcon";
import { Link, useLocation } from "react-router-dom";

import styles from "./Header.module.scss";
const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <MainLogo />
      <nav className={styles.header__tabs}>
        <Link
          to="/"
          className={`${styles["header__item"]} ${
            pathname === "/" && styles["header__item_active"]
          }`}
        >
          Products
        </Link>
        <Link
          to="/categories"
          className={`${styles["header__item"]} ${
            pathname === "/categories" && styles["header__item_active"]
          }`}
        >
          Categories
        </Link>
      </nav>
      <div className={styles.header__icons}>
        <BagIcon />
        <UserIcon />
      </div>
    </header>
  );
};

export default Header;
