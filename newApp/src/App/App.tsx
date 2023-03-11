import React from "react";

import "@styles/styles.scss";
import Header from "@components/Header";
import { LoaderSize } from "@components/Loader/Loader";
import { WithLoader } from "@components/Loader/WithLoader";
import Product from "@pages/Product";
import Products from "@pages/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ProductWithLoader = WithLoader(Product, LoaderSize.m);
const ProductsWithLoader = WithLoader(Products, LoaderSize.m);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsWithLoader />} />
        <Route path="/:id" element={<ProductWithLoader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
