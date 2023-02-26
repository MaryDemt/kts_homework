import { ProductItem } from "@pages/Products/Products";
import { useNavigate } from "react-router-dom";

import styles from "./Card.module.scss";

const CardItem = (item: ProductItem) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/${id}`);
  };
  return (
    <li
      key={item.id}
      className={styles.card}
      onClick={() => handleClick(item.id)}
    >
      <img
        className={styles.card__image}
        src={item.images && item.images.length ? item.images[0] : ""}
        alt={item.description}
      />
      <p className={styles.card__category}>
        {item.category && item.category.name ? item.category.name : ""}
      </p>
      <h2 className={styles.card__title}>{item.title}</h2>
      <p className={styles.card__description}>{item.description}</p>
      <p className={styles.card__price}>${item.price}</p>
    </li>
  );
};

export default CardItem;
