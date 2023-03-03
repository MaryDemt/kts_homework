import { useEffect, useState } from "react";

import { SliderIcon } from "@components/icons/slider_icon";
import ProductItem from "@components/ProductType";

import styles from "./Slider.module.scss";

const Slider = (product: ProductItem) => {
  const [listOfImages, setListOfImages] = useState<string[]>();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    setListOfImages(product.images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetActiveImage = (step: number) => {
    if (step > 0) {
      if (listOfImages?.length === activeImageIndex + 1) {
        setActiveImageIndex(0);
      } else {
        setActiveImageIndex((prev) => prev + 1);
      }
    } else {
      if (activeImageIndex === 0 && listOfImages && listOfImages.length) {
        setActiveImageIndex(listOfImages.length - 1);
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
        nameOfClass={`${styles.slider__icon} ${styles["slider__icon-left"]}`}
        handleClick={handleSetActiveImage}
        step={-1}
      />
      <SliderIcon
        nameOfClass={`${styles.slider__icon} ${styles["slider__icon-right"]}`}
        handleClick={handleSetActiveImage}
        step={1}
      />
    </div>
  );
};

export default Slider;
