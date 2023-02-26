import Slider from "@pages/Product/components/Slider/Slider";
import { ProductItem } from "@pages/Products/Products";

import styles from "./Card.module.scss";

const Card = (product: ProductItem) => {
  return (
    <section className={styles["product-card"]}>
      <Slider {...product} />
      <div className={styles["product-card__info"]}>
        <h1 className={styles["product-card__title"]}>{product.title}</h1>
        <p className={styles["product-card__description"]}>
          {product.description}
        </p>
        <p className={styles["product-card__price"]}>${product.price}</p>
        <div className={styles["product-card__button-group"]}>
          <button className={styles["product-card__button"]}>Buy Now</button>
          <button
            className={`
              ${styles["product-card__button"]} ${styles["product-card__button-outline"]}
            `}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Card;
