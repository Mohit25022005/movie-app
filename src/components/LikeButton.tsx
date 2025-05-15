'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      aria-label="Like movie"
      onClick={() => setLiked(!liked)}
      className={`px-4 py-2 rounded ${liked ? "bg-red-600 text-white" : "bg-gray-300"}`}
    >
      {liked ? "❤️ Liked" : "♡ Like"}
    </button>
  );
}
