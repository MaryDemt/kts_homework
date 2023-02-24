import { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

import Card from "./components/Card/Card";
import CardItem from "../Products/components/Card/Card";
import { ProductItem } from "../Products/Products";

import "./Product.scss";

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
  return product && Object.keys(product).length ? (
    <>
      <Card {...product} />
      <section className="product__related">
        <h2 className="product__related-title">Related Items</h2>
        <ul className="product__related-list">
          <CardItem {...product} />
          <CardItem {...product} />
          <CardItem {...product} />
        </ul>
      </section>
    </>
  ) : (
    <></>
  );
};

export default Product;
