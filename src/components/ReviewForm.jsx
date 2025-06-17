import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ productId, apiBase }) {
  const [userId, setUserId] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [photo_url, setPhotoUrl] = useState("");

  const isValidUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uid = parseInt(userId);
    const rate = rating ? parseInt(rating) : null;

    if (!uid || isNaN(uid)) {
      return alert("❌ Please enter a valid numeric user ID.");
    }

    if (!rate && review.trim() === "") {
      return alert("❌ Provide at least a rating or a review.");
    }

    if (rate && (rate < 1 || rate > 5)) {
      return alert("❌ Rating must be between 1 and 5.");
    }

    if (photo_url && !isValidUrl(photo_url)) {
      return alert("❌ Please enter a valid photo URL.");
    }

    try {
      await axios.post(`${apiBase}/reviews`, {
        userId: uid,
        productId,
        rating: rate,
        review: review.trim(),
        photo_url: photo_url.trim() || null,
      });

      alert("✅ Review submitted!");
      setRating("");
      setReview("");
      setPhotoUrl("");
    } catch (err) {
      alert(err.response?.data?.error || "❌ Error submitting review.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h4 className="text-lg font-semibold text-gray-700">
        Submit your Review
      </h4>

      <input
        type="number"
        placeholder="Your User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="number"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <textarea
        placeholder="Write a review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <input
        type="text"
        placeholder="Photo URL (optional)"
        value={photo_url}
        onChange={(e) => setPhotoUrl(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
      >
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
