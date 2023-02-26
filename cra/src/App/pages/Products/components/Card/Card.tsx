import { ProductItem } from "@pages/Products/Products";
import { useNavigate } from "react-router-dom";

import { ProductItem } from "../../../Products/Products";

import "./Card.scss";

const CardItem = (item: ProductItem) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/${id}`);
  };
  return (
    <li key={item.id} className="card" onClick={() => handleClick(item.id)}>
      <img
        className="card__image"
        src={item.images && item.images.length ? item.images[0] : ""}
        alt={item.description}
      />
      <p className="card__category">
        {item.category && item.category.name ? item.category.name : ""}
      </p>
      <h2 className="card__title">{item.title}</h2>
      <p className="card__description">{item.description}</p>
      <p className="card__price">${item.price}</p>
    </li>
  );
};

export default CardItem;
