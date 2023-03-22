import React from "react";

import { FilterIcon } from "@components/icons/FilterIcon";
import { SearchIcon } from "@components/icons/SearchIcon";

import styles from "./SearchBlock.module.scss";

interface PropsItem {
  handleGetData: () => void;
  searchParams: string | null;
  setSearchParams: (event: string) => void;
  setFilterListIsOpen: (value: boolean) => void;
  filterListIsOpen: boolean;
}

const SearchBlock = ({
  handleGetData,
  searchParams,
  setSearchParams,
  setFilterListIsOpen,
  filterListIsOpen,
}: PropsItem) => {
  const handleSearchTitle = (e: { code: string }) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleGetData();
    }
  };
  return (
    <div className={styles.products__search}>
      <label className={styles.products__label}>
        <SearchIcon />
        <input
          className={styles.products__input}
          placeholder="Search property"
          defaultValue={searchParams ? searchParams : ""}
          type="text"
          onKeyDown={handleSearchTitle}
          onBlur={(e) => setSearchParams(e.target.value)}
        />
        <button
          className={styles["products__search-button"]}
          type="button"
          onClick={() => handleGetData()}
        >
          Find Now
        </button>
      </label>
      <button
        className={styles.products__button}
        onClick={() => setFilterListIsOpen(!filterListIsOpen)}
        type="button"
      >
        <FilterIcon />
        Filter
      </button>
    </div>
  );
};

export default SearchBlock;
