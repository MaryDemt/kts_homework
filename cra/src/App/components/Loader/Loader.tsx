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

const Loader: React.FC<LoaderProps> = (props) => {
  return props.loading === true || props.loading === undefined ? (
    <div
      className={`${styles.loader} ${
        props.size && styles[`loader_${props.size}`]
      }
      ${props.className && props.className}`}
    ></div>
  ) : (
    <></>
  );
};

export default Loader;
