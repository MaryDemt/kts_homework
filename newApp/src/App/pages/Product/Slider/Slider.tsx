import React, { useState } from "react";

import { SliderIcon } from "@components/icons/SliderIcon";
import ProductItem from "@components/ProductType/ProductItem";

import styles from "./Slider.module.scss";

const Slider = ({ ...product }: ProductItem) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleSetActiveImage = (step: number) => {
    if (step > 0) {
      if (product.images?.length === activeImageIndex + 1) {
        setActiveImageIndex(0);
      } else {
        setActiveImageIndex((prev) => prev + 1);
      }
    } else {
      if (activeImageIndex === 0 && product.images && product.images.length) {
        setActiveImageIndex(product.images.length - 1);
      } else {
        setActiveImageIndex((prev) => prev - 1);
      }
    }
  };

  return (
    <div className={styles.slider}>
      {product.images && product.images.length
        ? product.images.map((item: string, index: number) => {
            return (
              <img
                className={`${styles.slider__image} ${
                  activeImageIndex === index
                    ? styles["slider__image_active"]
                    : ""
                }`}
                key={item}
                src={item}
                alt={item}
              />
            );
          })
        : ""}
      <SliderIcon
        nameOfClass={`${styles.slider__icon} ${styles["slider__icon_left"]}`}
        handleClick={handleSetActiveImage}
        step={-1}
      />
      <SliderIcon
        nameOfClass={`${styles.slider__icon} ${styles["slider__icon_right"]}`}
        handleClick={handleSetActiveImage}
        step={1}
      />
    </div>
  );
};

export default Slider;
