import { useEffect, useState } from "react";
import { useUserPreferences } from "../context/UserPreferencesContext";

const getModalPlaceholder = (movieId) =>
  `https://picsum.photos/seed/${movieId}/768/384`;

// Prefer smaller sizes first for modal as well
const tmdbSizesModal = ["w300", "w342", "w500", "w780", "w1280", "original"];

const getNextModalVariant = (currentSrc, attempt) => {
  // review logic: fallback helper for modal image variants
  // Intentionally simple: return null to let callers use the placeholder.
  return null;
};

const MovieModal = ({ movie, onClose, onPlay }) => {
  // Show random pic immediately; try TMDB and overlay when it loads
  const [imageSrc, setImageSrc] = useState(movie.image);
  const [tmdbAttempt, setTmdbAttempt] = useState(0);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const {
    isLiked,
    toggleLike,
    isInMyList,
    toggleMyList,
    addToContinueWatching,
  } = useUserPreferences();

  const handleImageError = () => {
    const next = getNextModalVariant(imageSrc, tmdbAttempt + 1);
    if (next) {
      setTmdbAttempt((t) => t + 1);
      setImageSrc(next);
      return;
    }
    setImageSrc(getModalPlaceholder(movie.id));
    setPosterLoaded(true);
  };

  useEffect(() => {
    setPosterLoaded(false);
    setTmdbAttempt(0);
    const hasTmdb = movie?.image?.includes("image.tmdb.org");
    const tmdbUrl = hasTmdb
      ? movie.image.replace(/(\/t\/p\/)[^/]+\//, "$1w780/")
      : movie?.image || getModalPlaceholder(movie.id);
    setImageSrc(tmdbUrl);
  }, [movie?.id, movie?.image]);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Close modal on ESC key
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePlay = () => {
    addToContinueWatching(movie, 0);
    // notify Now Playing popup
    window.dispatchEvent(
      new CustomEvent("netflix:nowPlaying", { detail: { title: movie.title } }),
    );
    if (onPlay) onPlay();
    else alert(`Playing ${movie.title}...`);
  };

  const handleLike = () => {
    toggleLike(movie);
  };

  const handleAddToList = () => {
    toggleMyList(movie);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-netflix-black rounded-lg overflow-hidden max-w-3xl w-full mx-4 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Movie Image - Picsum shown immediately, TMDB overlays when loaded */}
        <div className="relative h-96 bg-black">
          <img
            src={getModalPlaceholder(movie.id)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          />
          <img
            src={imageSrc}
            alt={movie.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              posterLoaded || imageSrc.includes("picsum")
                ? "opacity-100"
                : "opacity-0"
            }`}
            onLoad={() => setPosterLoaded(true)}
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all duration-300 hover:scale-110"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2
              id="modal-title"
              className="text-4xl font-bold mb-2 drop-shadow-lg"
            >
              {movie.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-white/80 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>

            <button
              onClick={handleAddToList}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isInMyList(movie.id)
                  ? "bg-white text-black"
                  : "bg-gray-700/50 hover:bg-gray-700/70 text-white"
              }`}
              aria-label={
                isInMyList(movie.id) ? "Remove from list" : "Add to list"
              }
            >
              {isInMyList(movie.id) ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </button>

            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isLiked(movie.id)
                  ? "bg-netflix-red text-white"
                  : "bg-gray-700/50 hover:bg-gray-700/70 text-white"
              }`}
              aria-label={isLiked(movie.id) ? "Unlike" : "Like"}
            >
              {isLiked(movie.id) ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Movie Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-500 font-semibold">98% Match</span>
              <span className="text-gray-300">{movie.year || "2024"}</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs text-gray-300">
                HD
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed">{movie.description}</p>

            <div className="pt-4 border-t border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Cast: </span>
                  <span className="text-gray-300">{movie.cast || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Genres: </span>
                  <span className="text-gray-300">{movie.genres || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
