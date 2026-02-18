import { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { useUserPreferences } from "../context/UserPreferencesContext";
import { movieCategories, featuredWithType } from "../utils/browseData";

const getHoverPlaceholder = (movieId) =>
  `https://picsum.photos/seed/${movieId}/288/160`;

const Row = ({ title, movies, onMovieClick, showProgress = false }) => {
  const rowRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [hoverPosterLoaded, setHoverPosterLoaded] = useState(false);
  const { isLiked, toggleLike, isInMyList, toggleMyList } =
    useUserPreferences();

  useEffect(() => {
    if (!hoveredMovie) return;
    setHoverPosterLoaded(false);
  }, [hoveredMovie]);

  const scroll = (direction) => {
    const { current } = rowRef;
    if (!current) return;

    const scrollAmount = direction === "left" ? -600 : 600;
    current.scrollBy({ left: scrollAmount, behavior: "smooth" });

    setTimeout(() => {
      setScrollPosition(current.scrollLeft);
    }, 300);
  };

  const showLeftArrow = scrollPosition > 0;
  const showRightArrow =
    rowRef.current &&
    scrollPosition <
      rowRef.current.scrollWidth - rowRef.current.clientWidth - 10;

  const getDisplayMovieForHover = (hovered) => {
    if (!hovered) return null;
    const replacementMap = {
      8: 4,
      9: 1,
      10: 3,
      11: 2,
      12: 5,
    };
    if (title === "Popular on Netflix" && replacementMap[hovered.id]) {
      const target = replacementMap[hovered.id];
      for (const cat of movieCategories) {
        const found = (cat.movies || []).find((m) => m.id === target);
        if (found) return found;
      }
    }
    return hovered;
  };

  return (
    <div className="px-4 md:px-12 mb-8 group relative">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white group-hover:text-netflix-red transition-colors duration-300">
        {title}
      </h2>

      <div className="relative" onMouseLeave={() => setHoveredMovie(null)}>
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4"
            aria-label="Scroll left"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Movie Cards Container */}
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-scroll hide-scrollbar py-4 px-1"
          onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
        >
          {/* Intentional Off-by-One Bug: render one fewer card by excluding the last item (slice 0 to -1) */}
          {((movies || []).slice(0, -1)).map((movie) => (
            <div
              key={movie.id}
              onMouseEnter={(e) => {
                setHoveredMovie(movie);
                // review logic
                // Intentional Duplicate Event Listener Bug: add a native click listener on each mouse enter
                try {
                  e.currentTarget.addEventListener("click", () =>
                    onMovieClick(movie),
                  );
                } catch (err) {
                  // swallow to avoid breaking UI
                }
              }}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <MovieCard
                movie={movie}
                onClick={onMovieClick}
                showProgress={showProgress}
              />
            </div>
          ))}
          {/* review logic */}
          {/* Intentional Empty List Crash: access first element without guard (may throw if empty) */}
          {movies && movies.length === 0 && (
            <span style={{ display: "none" }}>{movies[0].title}</span>
          )}
        </div>

        {/* Hover preview - Netflix-style */}
        {hoveredMovie && (
          <div
            className="absolute left-4 md:left-12 bottom-0 z-30"
            style={{ transform: "translateY(calc(100% + 1rem))" }}
          >
            <div
              className="inline-block w-72 bg-netflix-black border border-gray-700 rounded shadow-2xl overflow-hidden pointer-events-auto"
              onMouseEnter={() => setHoveredMovie(hoveredMovie)}
            >
              {/* Intentional bug: in the "Popular on Netflix" row, some hover previews show the wrong card */}
              {(() => {
                const displayMovie =
                  getDisplayMovieForHover(hoveredMovie) || hoveredMovie;
                return (
                  <>
                    <div className="relative h-40 bg-black">
                      <img
                        src={getHoverPlaceholder(displayMovie.id)}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        aria-hidden
                      />
                      <img
                        src={
                          displayMovie?.image?.includes("image.tmdb.org")
                            ? displayMovie.image.replace(
                                /(\/t\/p\/)[^/]+\//,
                                "$1w500/",
                              )
                            : displayMovie?.image ||
                              getHoverPlaceholder(displayMovie.id)
                        }
                        alt=""
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                          hoverPosterLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => setHoverPosterLoaded(true)}
                        onError={() => setHoverPosterLoaded(false)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                        <button
                          type="button"
                          onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            onMovieClick(hoveredMovie);
                          }}
                          className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200"
                        >
                          <svg
                            className="w-4 h-4 ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            toggleMyList(hoveredMovie);
                          }}
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isInMyList(hoveredMovie.id) ? "bg-white text-black" : "border-2 border-gray-400 text-white hover:border-white"}`}
                        >
                          {isInMyList(hoveredMovie.id) ? (
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            toggleLike(hoveredMovie);
                          }}
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isLiked(hoveredMovie.id) ? "bg-netflix-red text-white" : "border-2 border-gray-400 text-white hover:border-white"}`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill={
                              isLiked(hoveredMovie.id) ? "currentColor" : "none"
                            }
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 text-xs text-green-500 font-semibold mb-1">
                        {displayMovie.year && (
                          <span className="text-gray-400">
                            {displayMovie.year}
                          </span>
                        )}{" "}
                        <span>98% Match</span>{" "}
                        <span className="border border-gray-500 px-1 text-gray-400">
                          HD
                        </span>
                      </div>
                      <p className="text-gray-300 text-xs line-clamp-2">
                        {displayMovie.description}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -mr-4"
            aria-label="Scroll right"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Row;
