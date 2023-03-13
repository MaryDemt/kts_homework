import React from "react";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading, className, size }) => {
  return loading === true || loading === undefined ? (
    <span
      className={`${styles.loader} ${size && styles[`loader_${size}`]}
      ${className && className}`}
    ></span>
  ) : null;
};

export default Loader;
