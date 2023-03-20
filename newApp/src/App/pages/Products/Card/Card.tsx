import React from "react";

import ProductItem from "@components/ProductType";
import { useNavigate } from "react-router-dom";

import styles from "./Card.module.scss";

const CardItem = (item: ProductItem) => {
  const navigate = useNavigate();
  return (
    <article
      key={item.id}
      className={styles.cards}
      onClick={() => navigate(`/${item.id}`)}
    >
      <img
        className={styles.cards__image}
        src={item.images && item.images.length ? item.images[0] : ""}
        alt={item.description}
      />
      <p className={styles.cards__category}>
        {item.category && item.category.name ? item.category.name : ""}
      </p>
      <h2 className={styles.cards__title}>{item.title}</h2>
      <p className={styles.cards__description}>{item.description}</p>
      <p className={styles.cards__price}>${item.price}</p>
    </article>
  );
};

export default CardItem;
