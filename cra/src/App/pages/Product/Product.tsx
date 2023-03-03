import { useEffect, useState } from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import ProductItem from "@components/ProductType";
import { baseUrl, GET_CATEGORIES, GET_PRODUCTS } from "@config/const";
import CardItem from "@pages/Products/Card";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

import Card from "./Card";
import styles from "./Product.module.scss";

const Product = () => {
  const [product, setProduct] = useState<ProductItem>();
  const [categoryId, setCategoryId] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [listOfSimilarProducts, setListOfSimilarProducts] = useState<
    ProductItem[]
  >([]);
  const { id } = useParams();

  useEffect(() => {
    handleGetDataProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categoryId) {
      handleGetDataSimilarProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const handleGetDataProduct = async () => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${id}/`,
    });
    setLoading(false);
    setProduct(responseData.data);
    setCategoryId(responseData.data.category.id);
  };

  const handleGetDataSimilarProduct = async () => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_CATEGORIES}${categoryId}/${GET_PRODUCTS}`,
    });
    setListOfSimilarProducts(responseData.data.slice(0, 3));
    setLoading(false);
  };
  return product && Object.keys(product).length ? (
    <>
      <Card {...product} />
      <section className={styles.product__related}>
        <h2 className={styles["product__related-title"]}>Related Items</h2>
        <ul className={styles["product__related-list"]}>
          {listOfSimilarProducts.length &&
            listOfSimilarProducts.map((product) => {
              return <CardItem key={product.id} {...product} />;
            })}
        </ul>
      </section>
    </>
  ) : (
    <Loader
      size={LoaderSize.m}
      loading={loading}
      className={styles.product__loader}
    />
  );
};

export default Product;
