import React, { useEffect } from "react";

import { LoaderSize } from "@components/Loader/Loader";
import { WithLoader } from "@components/Loader/WithLoader";
import ProductItem from "@components/ProductType/ProductItem";
import CardItem from "@pages/Products/Card";
import ProductStore from "@store/ProductStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Card from "./Card";
import styles from "./Product.module.scss";

const Product = () => {
  const productStore = useLocalStore(() => new ProductStore());
  const product: ProductItem | null = productStore.product;
  const { id } = useParams();

  const ProductLayout = () =>
    product && (
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
    );

  const ProductWithLoader = WithLoader(
    ProductLayout,
    LoaderSize.m,
    productStore.meta
  );

  useEffect(() => {
    productStore.getProductData(id);
  }, [id, productStore]);

  return <ProductWithLoader />;
};

export default observer(Product);
