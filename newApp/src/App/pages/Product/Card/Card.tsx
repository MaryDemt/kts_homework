import React from "react";

import ProductItem from "@components/ProductType/ProductItem";
import classNames from "classnames";

import styles from "./Card.module.scss";
import Slider from "../Slider";

const Card = ({ ...product }: ProductItem) => {
  return (
    <section className={styles["card"]}>
      <Slider {...product} />
      <div className={styles["card__info"]}>
        <h1 className={styles["card__title"]}>{product.title}</h1>
        <p className={styles["card__description"]}>{product.description}</p>
        <p className={styles["card__price"]}>${product.price}</p>
        <div className={styles["card__button-group"]}>
          <button className={styles["card__button"]}>Buy Now</button>
          <button
            className={classNames(
              styles["card__button"],
              styles["card__button_outline"]
            )}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Card;
