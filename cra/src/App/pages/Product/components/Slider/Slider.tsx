import { useEffect, useState } from "react";

import { ProductItem } from "@pages/Products/Products";

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
      if (listOfImages?.length === 0) {
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
      <svg
        onClick={() => handleSetActiveImage(-1)}
        className={`${styles.slider__icon} ${styles["slider__icon-left"]}`}
        viewBox="0 0 13 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1.95703 21.6128L10.0439 13.526C10.9989 12.571 10.9989 11.0082 10.0439 10.0531L1.95703 1.96631" />
      </svg>
      <svg
        onClick={() => handleSetActiveImage(1)}
        className={`${styles.slider__icon} ${styles["slider__icon-right"]}`}
        viewBox="0 0 13 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1.95703 21.6128L10.0439 13.526C10.9989 12.571 10.9989 11.0082 10.0439 10.0531L1.95703 1.96631" />
      </svg>
    </div>
  );
};

export default Slider;
