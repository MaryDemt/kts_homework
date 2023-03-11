import React, { ComponentType, useState } from "react";

import Loader, { LoaderSize } from "./Loader";

const WithLoader = (Component: ComponentType, size: LoaderSize) => {
  const WrappedComponent = (props: JSX.IntrinsicAttributes) => {
    const [loading, setLoading] = useState(false);
    return loading ? <Loader size={size} /> : <Component {...props} />;
  };
  return WrappedComponent;
};

export { WithLoader };
