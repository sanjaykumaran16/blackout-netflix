import { useState, useEffect } from 'react';
import { featuredMovie } from '../utils/movieData';

const getBannerPlaceholder = (id) =>
  `https://picsum.photos/seed/${id}/1280/720`;

const Banner = ({ onMovieClick, onPlay }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = featuredMovie.image;
    img.onload = () => {
      if (!cancelled) setImageLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) {
        setImageError(true);
        setImageLoaded(true);
      }
    };
    return () => {
      cancelled = true;
      img.src = '';
    };
  }, []);

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        {!imageLoaded && (
          <div className="w-full h-full bg-netflix-black-light animate-shimmer" />
        )}
        {imageError ? (
          <img
            src={getBannerPlaceholder(featuredMovie.id)}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={featuredMovie.image}
            alt={featuredMovie.title}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={() => setImageError(true)}
          />
        )}
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-12 max-w-3xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl animate-slide-up">
          {featuredMovie.title}
        </h1>
        
        <div className="flex items-center gap-3 mb-4 text-sm md:text-base animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-green-500 font-semibold">98% Match</span>
          <span className="text-gray-300">{featuredMovie.year}</span>
          <span className="border border-gray-400 px-2 py-0.5 text-xs text-gray-300">
            {featuredMovie.rating}
          </span>
          <span className="text-gray-300">{featuredMovie.seasons}</span>
        </div>

        <p className="text-base md:text-lg text-gray-200 mb-6 max-w-xl line-clamp-3 drop-shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {featuredMovie.description}
        </p>

        <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={() => onPlay ? onPlay(featuredMovie) : onMovieClick(featuredMovie)}
            className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-semibold hover:bg-white/80 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          
          <button 
            onClick={() => onMovieClick(featuredMovie)}
            className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded font-semibold hover:bg-gray-500/50 transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent" />
    </div>
  );
};

export default Banner;
