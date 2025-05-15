'use client'; // For interactivity

import Link from "next/link";
import { useState, useRef } from "react";
import { Movies } from "@/app/page";

interface MoviesListProps {
  title: string;
  movies: Movies[];
}

export default function MoviesList({ title, movies = [] }: MoviesListProps) {
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 800; // Adjust based on your design
      const newScrollPosition = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold mb-4 text-white px-4">{title}</h2>
      
      <div className="relative group">
        {/* Left scroll button */}
        {movies.length > 0 && (
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-r-md p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="flex space-x-2 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x"
        >
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="relative flex-none min-w-[180px] snap-start transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setIsHovering(movie.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="relative aspect-[2/3]">
                <img
                  src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder-poster.png"}
                  alt={movie.title}
                  className="rounded-md object-cover w-full h-full"
                  loading="lazy"
                />
                
                {/* Hover effect - rating and year */}
                {isHovering === movie.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-md flex flex-col justify-end p-3 transition-opacity duration-300">
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center text-xs text-gray-300 mt-1">
                      {movie.release_date && (
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                      )}
                      {movie.vote_average && (
                        <span className="ml-2 flex items-center">
                          {movie.vote_average.toFixed(1)}
                          <span className="text-yellow-400 ml-1">★</span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Show title only when not hovering */}
              {isHovering !== movie.id && (
                <h3 className="mt-2 text-sm text-gray-300 font-medium truncate">{movie.title}</h3>
              )}
            </Link>
          ))}
        </div>
        
        {/* Right scroll button */}
        {movies.length > 0 && (
          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-l-md p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}