// No 'use client' here — this is a Server Component
import React from "react";
import LikeButton from "@/components/LikeButton";
import AddReview from "@/components/AddReview";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  original_language: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  backdrop_path: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Review {
  id: string;
  author: string;
  content: string;
  url: string;
}

interface Props {
  params: { id: string };
}

const API_KEY = "db75be3f6da59e6c54d0b9f568d19d16";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

async function fetchMovieCredits(id: string): Promise<{ cast: CastMember[]; crew: any[] }> {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch movie credits");
  return res.json();
}

async function fetchMovieReviews(id: string): Promise<{ results: Review[] }> {
  const res = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch movie reviews");
  return res.json();
}

async function fetchSimilarMovies(id: string): Promise<{ results: MovieDetails[] }> {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch similar movies");
  return res.json();
}

export default async function MoviePage({ params }: Props) {
  const movieId = params.id;

  const [movie, credits, reviews, similarMovies] = await Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCredits(movieId),
    fetchMovieReviews(movieId),
    fetchSimilarMovies(movieId),
  ]);

  const director = credits.crew.find((c) => c.job === "Director");
  const composer = credits.crew.find((c) => c.job === "Original Music Composer" || c.job === "Music");

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Banner with Backdrop */}
      <div 
        className="relative w-full h-96 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
        }}
      >
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <h1 className="text-5xl font-bold mb-2 text-white">{movie.title}</h1>
          <div className="flex items-center gap-4 text-sm mb-4">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="border px-1 text-xs">{movie.original_language.toUpperCase()}</span>
            <span className="flex items-center">{movie.vote_average.toFixed(1)} <span className="text-yellow-400 ml-1">★</span></span>
          </div>
          
          <div className="flex gap-4 mb-6">
            <button className="bg-red-600 text-white px-6 py-2 rounded flex items-center hover:bg-red-700">
              <span className="mr-2">▶</span> Play
            </button>
            <LikeButton />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Movie Info */}
        <div className="md:col-span-2">
          <p className="text-lg mb-6">{movie.overview}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6 text-gray-300">
            <div>
              <span className="text-gray-400">Director:</span> {director ? director.name : "N/A"}
            </div>
            <div>
              <span className="text-gray-400">Music:</span> {composer ? composer.name : "N/A"}
            </div>
            <div className="col-span-2">
              <span className="text-gray-400">Genres:</span> {movie.genres.map((g) => g.name).join(", ")}
            </div>
          </div>
        </div>
        
        {/* Right Column - Poster */}
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-md w-full shadow-lg"
          />
        </div>
      </div>

      {/* Cast Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {credits.cast.slice(0, 12).map((actor) => (
            <div key={actor.id} className="text-center hover:scale-105 transition duration-200">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "/placeholder-profile.png"
                }
                alt={actor.name}
                className="rounded-md w-full mb-2 aspect-[2/3] object-cover"
              />
              <p className="font-medium truncate">{actor.name}</p>
              <p className="text-xs text-gray-400 truncate">as {actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">More Like This</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {similarMovies.results.slice(0, 6).map((movie) => (
            <div key={movie.id} className="hover:scale-105 transition duration-200">
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md w-full aspect-[2/3] object-cover"
              />
              <p className="mt-2 truncate">{movie.title}</p>
              <div className="flex items-center text-xs text-gray-400">
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span className="ml-2 flex items-center">{movie.vote_average?.toFixed(1)} <span className="text-yellow-400 ml-1">★</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <AddReview />
        </div>
        
        {reviews.results.length === 0 && <p className="text-gray-400">No reviews yet.</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.results.slice(0, 4).map((review) => (
            <div key={review.id} className="bg-gray-900 p-4 rounded-md">
              <p className="font-semibold mb-2">{review.author}</p>
              <p className="text-gray-300 text-sm mb-2 line-clamp-3">{review.content}</p>
              <a href={review.url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline text-sm">
                Read more
              </a>
            </div>
          ))}
        </div>
        
        {reviews.results.length > 4 && (
          <div className="text-center mt-6">
            <button className="border border-gray-400 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-800 transition">
              Show More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}