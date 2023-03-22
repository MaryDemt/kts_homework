import React from "react";

import "@styles/styles.scss";
import Header from "@components/Header";
import CategoriesList from "@pages/Categories";
import Product from "@pages/Product";
import Products from "@pages/Products";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:id" element={<Product />} />
        <Route path="/categories" element={<CategoriesList />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
