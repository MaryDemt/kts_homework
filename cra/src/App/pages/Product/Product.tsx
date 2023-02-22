import { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

import Card from "./components/Card/Card";
import { ProductItem } from "../Products/Products";

const Product = () => {
  const [product, setProduct] = useState<ProductItem>();
  const { id } = useParams();

  useEffect(() => {
    handleGetDataProduct();
  }, []);

  const handleGetDataProduct = async () => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `https://api.escuelajs.co/api/v1/products/${id}`,
    });
    setProduct(responseData.data);
  };
  return product && Object.keys(product).length ? <Card {...product} /> : <></>;
};

export default Product;
