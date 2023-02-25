import { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

import Card from "./components/Card/Card";
import CardItem from "../Products/components/Card/Card";
import { ProductItem } from "../Products/Products";

import "./Product.scss";

const Product = () => {
  const [product, setProduct] = useState<ProductItem>();
  const [categoryId, setCategoryId] = useState<number>();
  const [listOfSimilarProducts, setListOfSimilarProducts] = useState<
    ProductItem[]
  >([]);
  const { id } = useParams();

  useEffect(() => {
    handleGetDataProduct();
  }, []);

  useEffect(() => {
    if (categoryId) {
      handleGetDataSimilarProduct();
    }
  }, [categoryId]);

  const handleGetDataProduct = async () => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `https://api.escuelajs.co/api/v1/products/${id}`,
    });
    setProduct(responseData.data);
    setCategoryId(responseData.data.category.id);
  };

  const handleGetDataSimilarProduct = async () => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`,
    });
    setListOfSimilarProducts(responseData.data.slice(0, 3));
  };

  return product && Object.keys(product).length ? (
    <>
      <Card {...product} />
      <section className="product__related">
        <h2 className="product__related-title">Related Items</h2>
        <ul className="product__related-list">
          {listOfSimilarProducts.length
            ? listOfSimilarProducts.map((product) => {
                return <CardItem {...product} />;
              })
            : ""}
        </ul>
      </section>
    </>
  ) : (
    <></>
  );
};

export default Product;
