import React, { useEffect, useState } from "react";
import axios from "axios";

function ReviewList({ productId, initialReviewCount, apiBase }) {
  const [reviews, setReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      axios
        .get(`${apiBase}/reviews/${productId}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error(err));

      axios
        .get(`${apiBase}/reviews/tags/${productId}`)
        .then((res) => setTags(res.data.tags))
        .catch((err) => console.error("Error loading tags", err));
    }
  }, [productId, showModal, apiBase]);

  if (initialReviewCount === 0) return null;

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="mt-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded"
      >
        See Reviews ({initialReviewCount})
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-lg p-6 shadow-xl overflow-y-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Product Reviews</h2>
              <button
                className="text-gray-600 hover:text-red-500"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            {tags.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  🔖 Most Used Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="border border-gray-200 rounded p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-gray-700">
                        👤 {r.user.username}
                      </p>
                      {r.rating && (
                        <p className="text-yellow-500">⭐ {r.rating}</p>
                      )}
                    </div>
                    {r.review && (
                      <p className="text-gray-800 text-sm">{r.review}</p>
                    )}
                    {r.photo_url && (
                      <img
                        src={r.photo_url}
                        alt="review"
                        className="mt-2 w-32 h-20 object-cover rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewList;
