import { useState, useEffect, useRef } from "react";
import { movieCategories, featuredMovie } from "../utils/movieData";
import MovieCard from "./MovieCard";

const SearchModal = ({ isOpen, onClose, onMovieClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef(null);

  // Get all movies from all categories
  const allMovies = [
    featuredMovie,
    ...movieCategories.flatMap((category) => category.movies),
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getSmallVariant = (src) => {
    try {
      if (!src || !src.includes("image.tmdb.org")) return src || "";
      return src.replace(/(\/t\/p\/)[^/]+\//, "$1w300/");
    } catch (e) {
      return src || "";
    }
  };

  const getSearchPlaceholder = (movieId) =>
    `https://picsum.photos/seed/${movieId}/120/70`;

  // Debounce input to avoid filtering on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery === "") {
      setFilteredMovies([]);
      setHighlighted(-1);
      return;
    }

    const query = debouncedQuery.toLowerCase();
    const filtered = allMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.description?.toLowerCase().includes(query),
    );

    const uniqueMovies = filtered.filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id),
    );

    setFilteredMovies(uniqueMovies);
    setHighlighted(-1);
  }, [debouncedQuery]);

  useEffect(() => {
    if (isOpen) {
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
    } else {
      document.body.style.overflow = "unset";
      setSearchQuery("");
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMovieSelect = (movie) => {
    onMovieClick(movie);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (filteredMovies.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => Math.min(i + 1, filteredMovies.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const movie =
        highlighted >= 0 ? filteredMovies[highlighted] : filteredMovies[0];
      if (movie) handleMovieSelect(movie);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-netflix-black min-h-screen animate-slide-down">
        {/* Search Header */}
        <div className="px-4 md:px-12 py-6 border-b border-gray-800">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors duration-300"
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

            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for movies, shows..."
                className="w-full bg-transparent text-white text-xl md:text-2xl placeholder-gray-500 border-none outline-none focus:outline-none"
              />
              {/* Suggestions dropdown */}
              {filteredMovies.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-netflix-black border border-gray-800 rounded shadow-lg z-40 max-h-80 overflow-auto">
                  {filteredMovies.slice(0, 8).map((m, idx) => (
                    <div
                      key={m.id}
                      onMouseDown={(ev) => {
                        ev.preventDefault();
                        handleMovieSelect(m);
                      }}
                      onMouseEnter={() => setHighlighted(idx)}
                      className={`px-4 py-2 cursor-pointer flex items-center gap-3 hover:bg-gray-800 ${highlighted === idx ? "bg-gray-800" : ""}`}
                    >
                      <img
                        src={getSmallVariant(m?.image) || getSearchPlaceholder(m.id)}
                        alt=""
                        className="w-12 h-7 object-cover rounded"
                        onError={(e) => {
                          const img = e.target;
                          const attempts = parseInt(
                            img.dataset.attempt || "0",
                            10,
                          );
                          const sizes = [
                            "w300",
                            "w342",
                            "w500",
                            "w780",
                            "w1280",
                            "original",
                          ];
                          if (
                            m?.image?.includes("image.tmdb.org") &&
                            attempts < sizes.length
                          ) {
                            img.dataset.attempt = attempts + 1;
                            let src = img.src;
                            const matched = sizes.find((s) =>
                              src.includes(`/${s}/`),
                            );
                            if (matched) {
                              const currentIndex = sizes.indexOf(matched);
                              const candidates = [];
                              for (let i = currentIndex; i >= 0; i--)
                                candidates.push(sizes[i]);
                              for (
                                let i = currentIndex + 1;
                                i < sizes.length;
                                i++
                              )
                                candidates.push(sizes[i]);
                              const nextSize =
                                candidates[attempts] ||
                                candidates.find((s) => s !== matched);
                              if (nextSize)
                                src = src.replace(
                                  /(\/t\/p\/)[^/]+\//,
                                  `$1${nextSize}/`,
                                );
                            } else {
                              src = src.replace("/t/p/", "/t/p/w500/");
                            }
                            img.src = src;
                            return;
                          }
                          img.src = getSearchPlaceholder(m.id);
                        }}
                      />
                      <div className="text-sm text-white truncate">
                        {m.title}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {m.year}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
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
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="px-4 md:px-12 py-8">
          {searchQuery.trim() === "" ? (
            <div className="text-center py-20">
              <svg
                className="w-16 h-16 mx-auto text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-gray-400 text-lg">
                Start typing to search for movies and shows
              </p>
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No results found for "{searchQuery}"
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">
                {filteredMovies.length}{" "}
                {filteredMovies.length === 1 ? "result" : "results"} found
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredMovies.map((movie) => (
                  <div key={movie.id} onClick={() => handleMovieSelect(movie)}>
                    <MovieCard movie={movie} onClick={() => {}} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
