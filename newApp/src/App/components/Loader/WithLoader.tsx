import React, { ComponentType } from "react";

import ProductsStore from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";

import Loader, { LoaderSize } from "./Loader";

const WithLoader = (Component: ComponentType, size: LoaderSize) => {
  const WrappedComponent = (props: JSX.IntrinsicAttributes) => {
    const productsStore = useLocalStore(() => new ProductsStore());
    return productsStore.meta === Meta.loading ? (
      <Loader size={size} />
    ) : (
      <Component {...props} />
    );
  };
  return WrappedComponent;
};

export { WithLoader };
