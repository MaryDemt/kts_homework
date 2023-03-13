import React, { useEffect, useState } from "react";

import { baseUrl, GET_CATEGORIES } from "@config/const";
import axios, { AxiosResponse } from "axios";

import styles from "./CategoriesDropDown.module.scss";

interface CategoryItem {
  id: number;
  name: string;
  image: string;
}

interface PropsItem {
  handleGetDataProducts: Function;
  activeCategoryId: string | null;
}

const CategoriesDropDown = ({
  handleGetDataProducts,
  activeCategoryId,
}: PropsItem) => {
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<CategoryItem>({
    name: "",
    id: 0,
    image: "",
  });
  useEffect(() => {
    handleGetCategoriesList();
  }, []);

  useEffect(() => {
    if (activeValue.name !== "") {
      handleGetDataProducts(activeValue.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeValue]);

  const handleGetCategoriesList = async () => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_CATEGORIES}`,
    });
    setCategoriesList(responseData.data);
  };
  return (
    <div className={styles["multi-dropdown"]}>
      <div
        className={styles["multi-dropdown__header"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles["multi-dropdown__title"]}>
          {activeValue.name !== "" ? activeValue.name : "Category"}
        </div>
      </div>
      {categoriesList.length && isOpen ? (
        <div className={styles["multi-dropdown__list"]}>
          {categoriesList.map((it) => {
            return (
              <div
                className={`${styles["multi-dropdown__item"]} ${
                  (activeValue.name === it.name ||
                    Number(activeCategoryId) === it.id) &&
                  styles["multi-dropdown__item_active"]
                } `}
                key={it.id}
                onClick={() => setActiveValue(it)}
              >
                {it.name}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default CategoriesDropDown;
