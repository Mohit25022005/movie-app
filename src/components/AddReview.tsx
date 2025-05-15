'use client';

import { useState, FormEvent } from 'react';

export default function AddReview() {
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!review.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-green-600 font-semibold">Thank you for your review!</p>;
  }

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={4}
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}
