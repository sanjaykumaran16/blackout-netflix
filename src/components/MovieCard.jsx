import { useState, useEffect, useRef } from "react";
import { useUserPreferences } from "../context/UserPreferencesContext";

const IMAGE_LOAD_TIMEOUT_MS = 4000;
const MAX_TMDB_ATTEMPTS = 3; // try a few sizes, then show placeholder (stops shimmer)

// Random pictures when poster is unavailable (Picsum – seed by movie id so each card gets a stable but varied image)
const getPlaceholderForMovie = (movieId) =>
  `https://picsum.photos/seed/${Math.abs(movieId)}/208/256`;

// Prefer smaller TMDB sizes first to avoid loading very large images
const tmdbSizesOrder = ["w300", "w342", "w500", "w780", "w1280", "original"];

const getAlternativeTmdbSrc = (currentSrc, attempt) => {
  try {
    if (!currentSrc.includes("image.tmdb.org")) return null;

    // determine current size index
    const match = currentSrc.match(/\/t\/p\/([^/]+)\//);
    const currentSize = match ? match[1] : null;
    let currentIndex = tmdbSizesOrder.indexOf(currentSize);
    if (currentIndex === -1) currentIndex = tmdbSizesOrder.indexOf("w500");

    // build candidate list: smaller sizes first, then larger
    const candidates = [];
    for (let i = currentIndex; i >= 0; i--) candidates.push(tmdbSizesOrder[i]);
    for (let i = currentIndex + 1; i < tmdbSizesOrder.length; i++)
      candidates.push(tmdbSizesOrder[i]);

    const chosen =
      candidates[attempt] || candidates.find((s) => s !== currentSize);
    if (!chosen) return null;

    return currentSrc.replace(/(\/t\/p\/)[^/]+\//, `$1${chosen}/`);
  } catch (err) {
    return null;
  }
};

const MovieCard = ({ movie, onClick, showProgress }) => {
  const getSmallVariant = (src) => {
    try {
      if (!src || !src.includes("image.tmdb.org")) return src;
      // prefer w342 then w300
      return src.replace(/(\/t\/p\/)[^/]+\//, "$1w342/");
    } catch (e) {
      return src;
    }
  };

  const [imageSrc, setImageSrc] = useState(() => getSmallVariant(movie.image));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [tmdbAttempt, setTmdbAttempt] = useState(0);
  const loadTimeoutRef = useRef(null);
  const { isLiked, isInMyList, continueWatching } = useUserPreferences();

  // Reset image state when movie changes (e.g. list reorder or different data)
  useEffect(() => {
    setImageSrc(getSmallVariant(movie.image));
    setImageLoaded(false);
    setImageError(false);
    setTmdbAttempt(0);
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    // review logic
    // Intentional Memory Leak Pattern: add resize listener on movie change without cleanup
    const onResize = () => {
      // no-op but prevents GC of closure
      void window.innerWidth;
    };
    window.addEventListener('resize', onResize);
  }, [movie.id, movie.image]);

  const liked = isLiked(movie.id);
  const inList = isInMyList(movie.id);
  const watchData = continueWatching.find((m) => m.id === movie.id);
  const progress = watchData?.progress || 0;

  // If image doesn't load within timeout, try next size or show placeholder (stops shimmer)
  useEffect(() => {
    if (imageLoaded || imageError) return;
    loadTimeoutRef.current = setTimeout(() => {
      const underAttemptLimit = tmdbAttempt + 1 < MAX_TMDB_ATTEMPTS;
      const next = underAttemptLimit
        ? getAlternativeTmdbSrc(imageSrc, tmdbAttempt + 1)
        : null;
      if (next) {
        setTmdbAttempt((t) => t + 1);
        setImageSrc(next);
      } else {
        setImageError(true);
        setImageLoaded(true);
      }
    }, IMAGE_LOAD_TIMEOUT_MS);
    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [imageSrc, imageLoaded, imageError, tmdbAttempt]);

  const handleImageError = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    const underAttemptLimit = tmdbAttempt + 1 < MAX_TMDB_ATTEMPTS;
    const next = underAttemptLimit
      ? getAlternativeTmdbSrc(imageSrc, tmdbAttempt + 1)
      : null;
    if (next) {
      setTmdbAttempt((t) => t + 1);
      setImageSrc(next);
      setImageError(false);
      setImageLoaded(false);
      return;
    }
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div
      className="flex-shrink-0 w-44 md:w-52 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10 movie-card-overlap"
      onClick={() => onClick(movie)}
    >
      <div className="relative overflow-hidden rounded-md shadow-lg">
        {imageError ? (
          <img
            src={getPlaceholderForMovie(movie.id)}
            alt=""
            className="w-full h-64 object-cover"
          />
        ) : (
          <img
            src={imageSrc}
            alt={movie.title}
            className={`w-full h-64 object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => {
              if (loadTimeoutRef.current) {
                clearTimeout(loadTimeoutRef.current);
                loadTimeoutRef.current = null;
              }
              setImageLoaded(true);
            }}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 w-full h-64 bg-netflix-black-light animate-shimmer rounded-md" />
        )}

        {/* Progress Bar for Continue Watching */}
        {showProgress && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div
              className="h-full bg-netflix-red transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Like Indicator */}
        {liked && (
          <div className="absolute top-2 right-2 bg-netflix-red rounded-full p-1.5">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}

        {/* My List Indicator */}
        {inList && !liked && (
          <div className="absolute top-2 right-2 bg-white rounded-full p-1.5">
            <svg
              className="w-4 h-4 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 className="text-white font-semibold text-sm mb-1">
              {movie.title}
            </h3>
            <p className="text-gray-300 text-xs line-clamp-2">
              {movie.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
