import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../styles/styles.scss";
import Product from "./pages/Product";
import Products from "./pages/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
