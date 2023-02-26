import { useEffect, useState } from "react";

import Card from "@pages/Product/components/Card";
import styles from "@pages/Product/Product.module.scss";
import CardItem from "@pages/Products/components/Card/Card";
import { ProductItem } from "@pages/Products/Products";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState<ProductItem>();
  const [categoryId, setCategoryId] = useState<number>();
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
      <section className={styles.product__related}>
        <h2 className={styles["product__related-title"]}>Related Items</h2>
        <ul className={styles["product__related-list"]}>
          {listOfSimilarProducts.length
            ? listOfSimilarProducts.map((product) => {
                return <CardItem key={product.id} {...product} />;
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
