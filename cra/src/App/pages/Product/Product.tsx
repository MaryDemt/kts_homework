import { useEffect } from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import CardItem from "@pages/Products/Card";
import ProductStore from "@src/store/ProductStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Card from "./Card";
import styles from "./Product.module.scss";

const Product = () => {
  const productStore = useLocalStore(() => new ProductStore());
  const { id } = useParams();

  useEffect(() => {
    handleGetDataProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetDataProduct = async () => {
    productStore.getProductData(id);
  };

  return productStore.product ? (
    <>
      <Card product={productStore.product} />
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
