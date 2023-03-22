import React, { useEffect, useState } from "react";

import { LoaderSize } from "@components/Loader/Loader";
import { WithLoader } from "@components/Loader/WithLoader";
import { CategoryItem } from "@components/ProductType/ProductItem";
import { baseUrl, GET_CATEGORIES } from "@config/const";
import { Meta } from "@utils/meta";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./CategoriesList.module.scss";

const CategoriesList = () => {
  const [listOfCategories, setListOfCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<Meta>(Meta.initial);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(Meta.loading);
    axios({
      method: "get",
      url: `${baseUrl}${GET_CATEGORIES}`,
    })
      .then((response) => {
        setListOfCategories(response.data);
        setLoading(Meta.success);
      })
      .catch(() => {
        setLoading(Meta.error);
      });
  }, []);

  const categoriesListLayout = () => (
    <section className={styles.list}>
      {listOfCategories.length ? (
        listOfCategories.map((it) => {
          return (
            <div
              className={styles.list__item}
              key={it.id}
              onClick={() => navigate(`/?categoryId=${it.id}`)}
            >
              <img
                className={styles.list__image}
                src={it.image}
                alt={it.name}
              />
              <p className={styles.list__name}>{it.name}</p>
            </div>
          );
        })
      ) : (
        <p>Ничего не найдено</p>
      )}
    </section>
  );

  const CategoriesListWithLoader = WithLoader(
    categoriesListLayout,
    LoaderSize.m,
    loading
  );

  return <CategoriesListWithLoader />;
};

export default CategoriesList;
