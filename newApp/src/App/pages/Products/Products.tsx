import React, { useEffect, useState } from "react";

import { FilterIcon } from "@components/icons/filter_icon";
import { SearchIcon } from "@components/icons/search_icon";
import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import { baseUrl, GET_PRODUCTS } from "@config/const";
import ProductsStore from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useSearchParams } from "react-router-dom";

import CardItem from "./Card";
import CategoriesDropDown from "./CategoriesDropDown";
import styles from "./Products.module.scss";

const makeFiltersUrl = (
  title: string | null,
  categoryId: string | null,
  offset: string | null,
  limit: string | null
) => {
  let result: string = "";
  if (title) {
    result += `?title=${title}`;
  }
  if (categoryId) {
    result += result.length
      ? `&categoryId=${categoryId}`
      : `?categoryId=${categoryId}`;
  }
  if (offset) {
    result += result.length ? `&offset=${offset}` : `?offset=${offset}`;
  }
  if (limit) {
    result += result.length ? `&limit=${limit}` : `?limit=${limit}`;
  }
  return result;
};

const Products = () => {
  const [filterParams] = useSearchParams();
  const searchTitle = filterParams.get("title");
  const categoryId = filterParams.get("categoryId");
  const offset = filterParams.get("offset");
  const limit = filterParams.get("limit");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<string>("");
  const [filterListIsOpen, setFilterListIsOpen] = useState<boolean>(false);
  const productsStore = useLocalStore(() => new ProductsStore());

  const navigate = useNavigate();

  useEffect(() => {
    handleGetDataProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTitle]);

  const handleGetDataProducts = (filterParameters = "") => {
    const preparedUrl = makeFiltersUrl(
      searchTitle,
      filterParameters ? filterParameters : categoryId,
      offset,
      limit
    );
    productsStore.handleGetListOfProducts(preparedUrl);
    navigate(preparedUrl ? preparedUrl : "/");
  };

  const handleAddNewProducts = () => {
    if (
      productsStore.listLength > 12 &&
      Math.ceil(productsStore.listLength / 12) !== currentPage
    ) {
      let url = "";
      if (!searchTitle && !categoryId && !offset && !limit) {
        url = `${baseUrl}${GET_PRODUCTS}?offset=${currentPage + 1}&limit=12`;
      } else {
        url = `${baseUrl}${GET_PRODUCTS}${makeFiltersUrl(
          searchTitle,
          categoryId,
          String(currentPage + 1),
          "12"
        )}`;
      }
      productsStore.handleAddNewItems(url);
      setCurrentPage((prev) => prev + 1);
      navigate(
        makeFiltersUrl(searchTitle, categoryId, String(currentPage + 1), limit)
      );
    }
  };

  const handleSearchItem = () => {
    const preparedUrl = makeFiltersUrl(searchParams, categoryId, "1", limit);
    productsStore.findSearchByTitle(preparedUrl);
    navigate(`/${preparedUrl}`);
  };

  return (
    <>
      <h1 className={styles.products__title}>Products</h1>
      <p className={styles.products__description}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
      <div className={styles.products__search}>
        <label className={styles.products__label}>
          <SearchIcon />
          <input
            className={styles.products__input}
            placeholder="Search property"
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
          />
          <button
            className={styles["products__search-button"]}
            onClick={handleSearchItem}
          >
            Find Now
          </button>
        </label>
        <button
          className={styles.products__button}
          onClick={() => setFilterListIsOpen(!filterListIsOpen)}
        >
          <FilterIcon />
          Filter
        </button>
      </div>
      {filterListIsOpen && (
        <CategoriesDropDown
          handleGetDataProducts={handleGetDataProducts}
          activeCategoryId={categoryId}
        />
      )}
      <h2 className={styles.products__subtitle}>
        Total Product{" "}
        <span className={styles.products__length}>
          {productsStore.listLength}
        </span>
      </h2>
      <ul className={styles.products__list}>
        {productsStore.list.length ? (
          productsStore.list.map((it, index) => {
            return <CardItem key={index + it.price + it.title} {...it} />;
          })
        ) : (
          <Loader
            size={LoaderSize.m}
            loading={productsStore.meta === Meta.loading}
          />
        )}
      </ul>
      <InfiniteScroll
        dataLength={productsStore.list.length}
        next={handleAddNewProducts}
        hasMore={true}
        loader={<Loader size={LoaderSize.s} loading={false} />}
      >
        <Loader size={LoaderSize.s} loading={false} />
      </InfiniteScroll>
    </>
  );
};

export default observer(Products);
