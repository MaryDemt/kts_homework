import React, { useEffect, useState } from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import { WithLoader } from "@components/Loader/WithLoader";
import { CategoryItem } from "@components/ProductType/ProductItem";
import { baseUrl, GET_CATEGORIES } from "@config/const";
import ProductsStore from "@store/ProductsStore";
import { useLocalStore } from "@utils/useLocalStore";
import axios, { AxiosResponse } from "axios";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

import CardItem from "./Card";
import CategoriesDropDown from "./CategoriesDropDown";
import styles from "./Products.module.scss";
import SearchBlock from "./Search/SearchBlock";

const makeFiltersUrl = (query: Object) => {
  let result: string = "";
  const queryArray = Object.entries(query);
  if (queryArray.length) {
    result += "?";
    for (let i = 0; i < queryArray.length; i++) {
      if (
        queryArray[i][1] !== null &&
        queryArray[i][1] !== "" &&
        queryArray[i][1] !== -1
      ) {
        result += `${queryArray[i][0]}=${queryArray[i][1]}`;

        if (i != queryArray.length - 1) {
          result += "&";
        }
      }
    }
  }
  return result;
};

const Products = () => {
  const [filterParams, setFilterParams] = useSearchParams();
  const searchTitle = filterParams.get("title");
  const categoryId = filterParams.get("categoryId");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<string | null>(searchTitle);
  const [filterListIsOpen, setFilterListIsOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryItem>({
    id: -1,
    name: "",
    image: "",
    creationAt: "",
    updatedAt: "",
  });
  const productsStore = useLocalStore(() => new ProductsStore());

  useEffect(() => {
    handleGetCategoryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  useEffect(() => {
    handleGetData(false, categoryId ? categoryId : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetData = async (needToAddNew = false, categoryId = "") => {
    const data = {
      title: searchParams,
      offset: needToAddNew ? String(currentPage + 1) : "1",
      limit: needToAddNew ? "12" : null,
      categoryId: "",
    };
    if (categoryId || currentCategory.id !== -1) {
      data.categoryId = categoryId ? categoryId : String(currentCategory.id);
    }
    const preparedUrl = makeFiltersUrl(data);
    if (needToAddNew) {
      await productsStore.handleAddNewItems(preparedUrl);
      setCurrentPage((prev) => prev + 1);
    } else {
      await productsStore.handleGetListOfProducts(preparedUrl);
    }
    setFilterParams(preparedUrl);
  };

  const handleGetCategoryInfo = async () => {
    if (categoryId) {
      let responseData: AxiosResponse = await axios({
        method: "get",
        url: `${baseUrl}${GET_CATEGORIES}${categoryId}`,
      });
      setCurrentCategory(responseData.data);
    } else {
      setCurrentCategory({
        id: -1,
        name: "",
        image: "",
        creationAt: "",
        updatedAt: "",
      });
    }
  };

  const ProductsLayout = () => (
    <>
      <h1 className={styles.products__title}>Products</h1>
      <p className={styles.products__description}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
      <SearchBlock
        handleGetData={handleGetData}
        setFilterListIsOpen={setFilterListIsOpen}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        filterListIsOpen={filterListIsOpen}
      />
      {filterListIsOpen && (
        <CategoriesDropDown
          handleGetDataProducts={handleGetData}
          activeCategory={currentCategory}
        />
      )}
      <h2 className={styles.products__subtitle}>
        Total Product{" "}
        <span className={styles.products__length}>
          {productsStore.listLength}
        </span>
      </h2>
      <ul className={styles.products__list}>
        {productsStore.list.length
          ? productsStore.list.map((it, index) => {
              return <CardItem key={index + it.price + it.title} {...it} />;
            })
          : ""}
      </ul>
      <InfiniteScroll
        dataLength={productsStore.listLength}
        next={() => handleGetData(true)}
        hasMore={
          productsStore.listLength > 12 &&
          Math.floor(productsStore.listLength / 12) !== currentPage
            ? true
            : false
        }
        loader={<Loader size={LoaderSize.s} loading={false} />}
      >
        {/* <Loader size={LoaderSize.s} loading={false} /> */}
      </InfiniteScroll>
    </>
  );

  const ProductsWithLoader = WithLoader(
    ProductsLayout,
    LoaderSize.m,
    productsStore.meta
  );

  return <ProductsWithLoader />;
};

export default observer(Products);
