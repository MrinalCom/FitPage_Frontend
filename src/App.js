import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/products`)

      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="p-8 flex flex-col items-center">
      <h3 className="inline-flex text-3xl font-bold bg-slate-400 text-black px-6 py-3 rounded shadow">
        Product Ratings & Reviews
      </h3>

      <ProductList products={products} />
    </div>
  );
}

export default App;
