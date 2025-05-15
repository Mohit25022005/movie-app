// components/MovieCard.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiHeart, BiPlay, BiInfoCircle, BiPlus } from "react-icons/bi";
import { Movies } from "@/app/page";

const MovieCard = ({ movie }: { movie: Movies }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format date to just the year
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";
  
  return (
    <Link 
      href={`/movie/${movie.id}`}
      className="relative block rounded-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative">
        {/* Movie poster/backdrop image */}
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover rounded-md transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
        />
        
        {/* Dark gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100`}></div>
        
        {/* Title and basic info always visible at bottom */}
        <div className="absolute bottom-0 left-0 w-full p-3 z-10">
          <h2 className="text-white font-medium truncate">{movie.title}</h2>
        </div>
        
        {/* Expanded hover information */}
        {isHovered && (
          <>
            {/* Expanded content overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 z-10 transition-opacity duration-300"></div>
            
            {/* Content wrapper */}
            <div className="absolute inset-0 z-20 flex flex-col p-3">
              {/* Top section - Title and controls */}
              <div className="flex-grow flex flex-col justify-center items-center">
                <h2 className="text-white font-bold text-center mb-3">{movie.title}</h2>
                
                {/* Play button */}
                <button className="bg-white text-black rounded-full p-2 w-12 h-12 flex items-center justify-center mb-4 hover:bg-opacity-80 transition-colors">
                  <BiPlay size={24} />
                </button>
                
                {/* Action buttons */}
                <div className="flex space-x-2 justify-center">
                  <button className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-white transition-colors">
                    <BiPlus size={18} />
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-white transition-colors">
                    <BiHeart size={18} />
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-white transition-colors">
                    <BiInfoCircle size={18} />
                  </button>
                </div>
              </div>
              
              {/* Bottom section - Meta data */}
              <div className="mt-auto">
                <div className="flex justify-between items-center text-sm text-white">
                  <div className="flex items-center">
                    <span className="text-green-500 font-medium mr-2">
                      {Math.round(movie.vote_average * 10)}% Match
                    </span>
                    {releaseYear && <span>{releaseYear}</span>}
                  </div>
                  
                  <div className="flex items-center text-xs">
                    <span className="flex items-center">
                      <BiHeart className="mr-1" />
                      {movie.vote_count.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;