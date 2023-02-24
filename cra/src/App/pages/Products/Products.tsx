import { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import CardItem from "./components/Card";
import "./Products.scss";
import { FilterIcon } from "../../components/icons/filter_icon";
import { SearchIcon } from "../../components/icons/search_icon";

export interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
}

const Products = () => {
  const [listOfProducts, setListOfProducts] = useState<ProductItem[]>([]);
  const [listLength, setListLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesMax, setPagesMax] = useState<number>(0);

  useEffect(() => {
    handleGetDataProducts();
  }, []);

  const handleGetDataProducts = async () => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: "https://api.escuelajs.co/api/v1/products",
    });
    setListLength(responseData.data.length);
    setPagesMax(Math.floor(responseData.data.length / 12));
    setListOfProducts(responseData.data.slice(0, 12));
  };

  const handleAddNewProducts = async () => {
    let responseData: any = await axios({
      method: "get",
      url: `https://api.escuelajs.co/api/v1/products?offset=${
        currentPage + 1
      }&limit=12`,
    });
    setListOfProducts((prev) => [...prev, ...responseData.data]);
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <h1 className="products__title">Products</h1>
      <p className="products__description">
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
      <div className="products__search">
        <label className="products__label">
          <SearchIcon />
          <input className="products__input" placeholder="Search property" />
          <button className="products__search-button">Find Now</button>
        </label>
        <button className="products__button">
          <FilterIcon />
          Filter
        </button>
      </div>
      <h2 className="products__subtitle">
        Total Product <span className="products__length">{listLength}</span>
      </h2>
      <ul className="products__list">
        {listOfProducts.length
          ? listOfProducts.map((it) => {
              return <CardItem {...it} />;
            })
          : ""}
      </ul>
      <InfiniteScroll
        dataLength={listOfProducts.length}
        next={handleAddNewProducts}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {listOfProducts.map((i, index) => (
          <div key={index}>div - #{index}</div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Products;
