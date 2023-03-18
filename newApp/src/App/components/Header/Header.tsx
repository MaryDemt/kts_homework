import React from "react";

import { BagIcon } from "@components/icons/BagIcon";
import { MainLogo } from "@components/icons/HeaderLogo";
import { UserIcon } from "@components/icons/UserIcon";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
const Header = () => {
  return (
    <header className={styles.header}>
      <MainLogo />
      <nav className={styles.header__tabs}>
        <Link
          to="/"
          className={`${styles["header__item"]} ${styles["header__item_active"]}`}
        >
          Products
        </Link>
        <Link to="/categories" className={styles["header__item"]}>
          Categories
        </Link>
        <Link to="/about" className={styles["header__item"]}>
          About Us
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
