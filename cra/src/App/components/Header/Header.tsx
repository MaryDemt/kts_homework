import styles from "@components/Header/Header.module.scss";
import { BagIcon } from "@components/icons/bag-2";
import { MainLogo } from "@components/icons/header_logo";
import { UserIcon } from "@components/icons/user";

const Header = () => {
  return (
    <header className="header">
      <MainLogo />
      <div className="header__tabs">
        <p className="header__tabs-item header__tabs-item_active">Products</p>
        <p className="header__tabs-item">Categories</p>
        <p className="header__tabs-item">About Us</p>
      </div>
      <div className="header__icons">
        <BagIcon />
        <UserIcon />
      </div>
    </header>
  );
};

export default Header;
