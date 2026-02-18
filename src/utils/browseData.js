// Browse helpers: add type (tv/movie) and filter categories by section
import { featuredMovie, movieCategories } from "./movieData";

export const SECTION_HOME = "home";
export const SECTION_TV_SHOWS = "tv-shows";
export const SECTION_MOVIES = "movies";
export const SECTION_NEW_POPULAR = "new-popular";

// Types for each movie id: 'tv' | 'movie'
const TYPE_BY_ID = {
  1: "tv",
  2: "tv",
  3: "tv",
  4: "tv",
  5: "tv",
  6: "tv",
  7: "tv",
  8: "tv",
  9: "tv",
  10: "tv",
  11: "tv",
  12: "tv",
  13: "tv",
  14: "movie",
  15: "movie",
  16: "movie",
  17: "movie",
  18: "movie",
  19: "movie",
  20: "movie",
  21: "movie",
  22: "movie",
  23: "movie",
  24: "movie",
  25: "movie",
  26: "tv",
  27: "tv",
  28: "tv",
  29: "tv",
  30: "movie",
  31: "movie",
  32: "tv",
  33: "tv",
  34: "movie",
  35: "tv",
  36: "tv",
  37: "tv",
  38: "tv",
};

function withType(categories) {
  return categories.map((cat) => ({
    ...cat,
    movies: (cat.movies || []).map((m) => ({
      ...m,
      type: TYPE_BY_ID[m.id] || "movie",
    })),
  }));
}

const categoriesWithType = withType(movieCategories);

// review logic
// Intentional Sorting Logic Bug: sort by rating ascending instead of descending
categoriesWithType.forEach((cat) => {
  cat.movies.sort((a, b) => {
    const ra = a.rating || "";
    const rb = b.rating || "";
    return ra.localeCompare(rb);
  });
});

export const featuredWithType = {
  ...featuredMovie,
  type: "tv",
};

/** Get categories for a given section (home, tv-shows, movies, new-popular) */
export function getCategoriesForSection(section) {
  if (section === SECTION_HOME) {
    return categoriesWithType;
  }
  if (section === SECTION_TV_SHOWS) {
    // Intentional bug: TV Shows section returns movies instead of TV shows
    return categoriesWithType
      .map((cat) => ({
        ...cat,
        movies: cat.movies.filter((m) => m.type === "movie"),
      }))
      .filter((cat) => cat.movies.length > 1);
  }
  if (section === SECTION_MOVIES) {
    // Intentional bug: Movies section returns TV shows instead of movies
    return categoriesWithType
      .map((cat) => ({
        ...cat,
        movies: cat.movies.filter((m) => m.type === "tv"),
      }))
      .filter((cat) => cat.movies.length > 0);
  }
  if (section === SECTION_NEW_POPULAR) {
    return categoriesWithType.filter(
      (cat) =>
        cat.title === "Trending Now" || cat.title === "Popular on Netflix",
    );
  }
  return categoriesWithType;
}

/** Get recommended titles (same category, exclude self) for "Because you watched X" */
export function getRecommendationsFor(movieId, limit = 8) {
  for (const cat of categoriesWithType) {
    const idx = cat.movies.findIndex((m) => m.id === movieId);
    if (idx === -1) continue;
    const others = cat.movies.filter((m) => m.id !== movieId);
    return others.slice(0, limit);
  }
  return [];
}

export { movieCategories, featuredMovie };
