import React from "react";

import classnames from "classnames";

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

const Loader: React.FC<LoaderProps> = ({ className, size }) => {
  return (
    <span
      className={classnames(styles.loader, styles[`loader_${size}`], {
        className: className,
      })}
    ></span>
  );
};

export default Loader;
