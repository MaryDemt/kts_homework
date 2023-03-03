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
import styles from "./Products.module.scss";

const Products = () => {
  const [listOfProducts, setListOfProducts] = useState<ProductItem[]>([]);
  const [listLength, setListLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [filterParams] = useSearchParams();
  const searchTitle = filterParams.get("title");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTitle) {
      handleGetDataProducts(searchTitle);
    } else {
      handleGetDataProducts();
    }
  }, [searchTitle]);

  useEffect(() => {
    if (searchParams.trim().length > 2) {
      handleSearchItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleGetDataProducts = async (filterParameters = "") => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${
        filterParameters && `?title=${filterParameters}`
      }`,
    });
    setLoading(false);
    setListLength(responseData.data.length);
    setListOfProducts(responseData.data.slice(0, 12));
  };

  const handleAddNewProducts = async () => {
    if (listLength > 12 && Math.ceil(listLength / 12) !== currentPage) {
      let url = "";
      if (!filterParams) {
        url = `${baseUrl}${GET_PRODUCTS}?offset=${currentPage + 1}&limit=12`;
      } else {
        url = `${baseUrl}${GET_PRODUCTS}?offset=${
          currentPage + 1
        }&limit=12&title=${searchTitle}`;
      }
      setLoading(true);
      let responseData: any = await axios({
        method: "get",
        url,
      });
      setListOfProducts((prev) => [...prev, ...responseData.data]);
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    }
  };

  const handleSearchItem = async () => {
    setLoading(true);
    let responseData: any = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}?title=${searchParams}`,
    });
    setListLength(responseData.data.length);
    setListOfProducts(responseData.data.slice(0, 12));
    navigate(`/?title=${searchParams}`);
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
          <button className={styles["products__search-button"]}>
            Find Now
          </button>
        </label>
        <button className={styles.products__button}>
          <FilterIcon />
          Filter
        </button>
      </div>
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
