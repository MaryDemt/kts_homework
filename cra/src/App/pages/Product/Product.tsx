import { useEffect, useState } from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import ProductItem from "@components/ProductType";
import CardItem from "@pages/Products/Card";
import ProductStore from "@src/store/ProductStore";
import { useLocalStore } from "@utils/useLocalStore";
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
  const productStore = useLocalStore(() => new ProductStore());
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
    let responseData = await productStore.getProductData(id);
    setLoading(false);
    setProduct(responseData.data);
    setCategoryId(responseData.data.category.id);
  };

  const handleGetDataSimilarProduct = async () => {
    let responseData = await productStore.getSimilarProductData(categoryId);
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
