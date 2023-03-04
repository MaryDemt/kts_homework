import { useEffect, useState } from "react";

import { FilterIcon } from "@components/icons/filter_icon";
import { SearchIcon } from "@components/icons/search_icon";
import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import ProductItem from "@components/ProductType";
import { baseUrl, GET_PRODUCTS } from "@config/const";
import axios, { AxiosResponse } from "axios";
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
  const [listOfProducts, setListOfProducts] = useState<ProductItem[]>([]);
  const [listLength, setListLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<string>("");
  const [filterListIsOpen, setFilterListIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetDataProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTitle]);

  const handleGetDataProducts = async (filterParameters = "") => {
    const preparedUrl = makeFiltersUrl(
      searchTitle,
      filterParameters ? filterParameters : categoryId,
      offset,
      limit
    );
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${preparedUrl}`,
    });
    setLoading(false);
    setListLength(responseData.data.length);
    setListOfProducts(responseData.data.slice(0, 12));
    navigate(preparedUrl ? preparedUrl : "/");
  };

  const handleAddNewProducts = async () => {
    if (listLength > 12 && Math.ceil(listLength / 12) !== currentPage) {
      let url = "";
      if (!makeFiltersUrl(searchTitle, categoryId, offset, limit)) {
        url = `${baseUrl}${GET_PRODUCTS}?offset=${currentPage + 1}&limit=12`;
      } else {
        url = `${baseUrl}${GET_PRODUCTS}${makeFiltersUrl(
          searchTitle,
          categoryId,
          String(currentPage + 1),
          "12"
        )}`;
      }
      setLoading(true);
      let responseData: any = await axios({
        method: "get",
        url,
      });
      setListOfProducts((prev) => [...prev, ...responseData.data]);
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
      navigate(
        makeFiltersUrl(searchTitle, categoryId, String(currentPage + 1), limit)
      );
    }
  };

  const handleSearchItem = async () => {
    setLoading(true);
    const preparedUrl = makeFiltersUrl(searchParams, categoryId, offset, limit);
    let responseData: any = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${preparedUrl}`,
    });
    setListLength(responseData.data.length);
    setListOfProducts(responseData.data.slice(0, 12));
    navigate(`/${preparedUrl}`);
    setLoading(false);
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
        <span className={styles.products__length}>{listLength}</span>
      </h2>
      <ul className={styles.products__list}>
        {listOfProducts.length ? (
          listOfProducts.map((it, index) => {
            return <CardItem key={index + it.price + it.title} {...it} />;
          })
        ) : (
          <Loader size={LoaderSize.m} loading={loading} />
        )}
      </ul>
      <InfiniteScroll
        dataLength={listOfProducts.length}
        next={handleAddNewProducts}
        hasMore={true}
        loader={<Loader size={LoaderSize.s} loading={false} />}
      >
        <Loader size={LoaderSize.s} loading={false} />
      </InfiniteScroll>
    </>
  );
};

export default Products;
