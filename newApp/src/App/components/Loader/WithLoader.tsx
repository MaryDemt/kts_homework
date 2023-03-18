import React, { ComponentType } from "react";

import { Meta } from "@utils/meta";

import Loader, { LoaderSize } from "./Loader";

const WithLoader = (
  Component: ComponentType,
  size: LoaderSize,
  loading: Meta
) => {
  const WrappedComponent = (props: JSX.IntrinsicAttributes) => {
    return loading === Meta.loading ? (
      <Loader size={size} />
    ) : (
      <Component {...props} />
    );
  };
  return WrappedComponent;
};

export { WithLoader };
