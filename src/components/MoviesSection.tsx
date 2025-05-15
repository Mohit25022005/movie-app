'use client';

import { useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Movies } from "@/app/page";

const MoviesSection = ({
  title,
  movies,
}: {
  title: string;
  movies: Movies[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 20);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Determine if we should use carousel or grid layout
  const useCarousel = movies.length > 5;

  return (
    <div 
      className="py-8 px-4 relative group" 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Section heading with subtle indicator when hovered */}
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {isHovering && useCarousel && (
          <span className="ml-2 text-gray-400 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explore All
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
      
      {useCarousel ? (
        <div className="relative">
          {/* Left navigation arrow */}
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 p-4 rounded-r-md text-white transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* Movie carousel */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex space-x-2 overflow-x-auto scrollbar-hide py-4 pl-1"
          >
            {movies.map((movie) => (
              <div 
                key={movie.id} 
                className="flex-none transition duration-300 transform hover:scale-105 hover:z-10"
                style={{ width: 'calc(20% - 8px)', minWidth: '180px' }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          
          {/* Right navigation arrow */}
          <button 
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 p-4 rounded-l-md text-white transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : (
        // Grid layout for smaller collections
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="transition duration-300 transform hover:scale-105 hover:z-10"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesSection;