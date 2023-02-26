import { BagIcon } from "@components/icons/bag-2";
import { MainLogo } from "@components/icons/header_logo";
import { UserIcon } from "@components/icons/user";

import styles from "./Header.module.scss";
const Header = () => {
  return (
    <header className={styles.header}>
      <MainLogo />
      <div className={styles.header__tabs}>
        <p
          className={`${styles["header__tabs-item"]} ${styles["header__tabs-item_active"]}`}
        >
          Products
        </p>
        <p className={styles["header__tabs-item"]}>Categories</p>
        <p className={styles["header__tabs-item"]}>About Us</p>
      </div>
      <div className={styles.header__icons}>
        <BagIcon />
        <UserIcon />
      </div>
    </header>
  );
};

export default Header;
