import { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";

import Card from "./components/Card";

import "./Products.scss";

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

  useEffect(() => {
    handleGetDataProducts();
  }, []);

  const handleGetDataProducts = async () => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: "https://api.escuelajs.co/api/v1/products?offset=0&limit=12",
    });
    setListOfProducts(responseData.data);
  };
  return (
    <>
      <h1 className="products__title">Total Product</h1>
      <ul className="products__list">
        {listOfProducts.length
          ? listOfProducts.map((it) => {
              return <Card {...it} />;
            })
          : ""}
      </ul>
    </>
  );
};

export default Products;
