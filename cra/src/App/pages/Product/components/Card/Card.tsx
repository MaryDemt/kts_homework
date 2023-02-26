import Slider from "@pages/Product/components/Slider/Slider";
import { ProductItem } from "@pages/Products/Products";

import "./Card.scss";

const Card = (product: ProductItem) => {
  return (
    <section className="product-card">
      <Slider {...product} />
      <div className="product-card__info">
        <h1 className="product-card__title">{product.title}</h1>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">${product.price}</p>
        <div className="product-card__button-group">
          <button className="product-card__button">Buy Now</button>
          <button className="product-card__button product-card__button-outline">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Card;
