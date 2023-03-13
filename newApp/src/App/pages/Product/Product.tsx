import React, { useEffect } from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import ProductItem from "@components/ProductType/ProductItem";
import CardItem from "@pages/Products/Card";
import ProductStore from "@store/ProductStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Card from "./Card";
import styles from "./Product.module.scss";

const Product = () => {
  const productStore = useLocalStore(() => new ProductStore());
  const product: ProductItem = productStore.product;
  const { id } = useParams();

  useEffect(() => {
    productStore.getProductData(id);
  }, [id, productStore]);

  return product.title ? (
    <>
      <Card {...product} />
      <section className={styles.product__related}>
        <h2 className={styles["product__related-title"]}>Related Items</h2>
        <ul className={styles["product__related-list"]}>
          {productStore.listOfSimilarProducts.length &&
            productStore.listOfSimilarProducts.map((product) => {
              return <CardItem key={product.id} {...product} />;
            })}
        </ul>
      </section>
    </>
  ) : (
    <Loader
      size={LoaderSize.m}
      loading={productStore.meta === Meta.loading}
      className={styles.product__loader}
    />
  );
};

export default observer(Product);
