import ProductItem from "@components/ProductType";
import { Link } from "react-router-dom";

import styles from "./Card.module.scss";

const CardItem = (item: ProductItem) => {
  return (
    <article key={item.id} className={styles.card}>
      <img
        className={styles.card__image}
        src={item.images && item.images.length ? item.images[0] : ""}
        alt={item.description}
      />
      <p className={styles.card__category}>
        {item.category && item.category.name ? item.category.name : ""}
      </p>
      <Link to={`/${item.id}`} className={styles.card__title}>
        {item.title}
      </Link>
      <p className={styles.card__description}>{item.description}</p>
      <p className={styles.card__price}>${item.price}</p>
    </article>
  );
};

export default CardItem;
