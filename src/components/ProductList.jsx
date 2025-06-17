import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

function ProductList({ products }) {
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100">
      {products.map((product) => {
        const avgRating =
          product.reviews.length > 0
            ? (
                product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                product.reviews.length
              ).toFixed(1)
            : "No ratings yet";

        return (
          <div
            key={product.id}
            className="w-full sm:w-[350px] bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm">
                ⭐ Average Rating:{" "}
                <span className="font-medium text-yellow-600">{avgRating}</span>
              </p>
              <button
                onClick={() => setActiveProduct(product.id)}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Write a Review
              </button>
              <ReviewList
                productId={product.id}
                initialReviewCount={product.reviews.length}
                apiBase={API_BASE}
              />
            </div>

            {activeProduct === product.id && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={() => setActiveProduct(null)}
              >
                <div
                  className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold mb-4">
                    Review for {product.name}
                  </h3>
                  <ReviewForm productId={product.id} apiBase={API_BASE} />
                  <button
                    onClick={() => setActiveProduct(null)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                    title="Close"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
