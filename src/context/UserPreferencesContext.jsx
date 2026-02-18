import { createContext, useContext, useState, useEffect } from "react";
import { featuredMovie, movieCategories } from "../utils/movieData";

const UserPreferencesContext = createContext();

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      "useUserPreferences must be used within UserPreferencesProvider",
    );
  }
  return context;
};

export const UserPreferencesProvider = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState([]);
  const [myList, setMyList] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem("netflix_liked_movies");
    const savedList = localStorage.getItem("netflix_my_list");
    const savedContinue = localStorage.getItem("netflix_continue_watching");

    if (savedLikes) {
      setLikedMovies(JSON.parse(savedLikes));
    }
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
    if (savedContinue) {
      setContinueWatching(JSON.parse(savedContinue));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("netflix_liked_movies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  useEffect(() => {
    localStorage.setItem("netflix_my_list", JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem(
      "netflix_continue_watching",
      JSON.stringify(continueWatching),
    );
  }, [continueWatching]);

  const toggleLike = (movie) => {
    setLikedMovies((prev) => {
      const isLiked = prev.some((m) => m.id === movie.id);
      if (isLiked) {
        // Notify removal
        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Removed from Likes: ${movie.title}` },
          }),
        );
        // Also remove from My List (intentional debug: likes and my list mirror each other)
        setMyList((ml) => ml.filter((m) => m.id !== movie.id));
        return prev.filter((m) => m.id !== movie.id);
      } else {
        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Added to Likes: ${movie.title}` },
          }),
        );
        // Also add to My List if not already present
        setMyList((ml) =>
          ml.some((m) => m.id === movie.id) ? ml : [...ml, movie],
        );
        return [...prev, movie];
      }
    });
  };

  const isLiked = (movieId) => {
    return likedMovies.some((m) => m.id === movieId);
  };

  const toggleMyList = (movie) => {
    setMyList((prev) => {
      const isInList = prev.some((m) => m.id === movie.id);
      if (isInList) {
        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Removed from My List: ${movie.title}` },
          }),
        );
        // Also remove from Likes to keep lists mirrored
        setLikedMovies((lm) => lm.filter((m) => m.id !== movie.id));
        return prev.filter((m) => m.id !== movie.id);
      } else {
        // Intentional bug: 4 movies show wrong movie cards in My List
        // Keep the original ID so removal works, but change display properties
        const buggyMovies = {
          3: {
            // Breaking Bad -> shows Stranger Things instead
            id: 3, // Keep original ID for removal to work
            title: "Stranger Things", // Wrong title
            image:
              "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", // Wrong image
            description:
              "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
            year: "2024",
            cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour, Gaten Matarazzo",
            genres: "Sci-Fi, Horror, Drama, Mystery",
          },
          5: {
            // The Witcher -> shows The Crown instead
            id: 5, // Keep original ID
            title: "The Crown", // Wrong title
            image:
              "https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg", // Wrong image
            description:
              "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
            year: "2016",
            cast: "Claire Foy, Olivia Colman, Imelda Staunton, Matt Smith, Tobias Menzies",
            genres: "Drama, History",
          },
          9: {
            // The Last of Us -> shows Black Mirror instead
            id: 9, // Keep original ID
            title: "Black Mirror", // Wrong title
            image:
              "https://image.tmdb.org/t/p/w500/5a6az40L3T3cQWjH3rmUCDr1gUx.jpg", // Wrong image
            description:
              "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
            year: "2011",
            cast: "Various (Anthology Series)",
            genres: "Drama, Sci-Fi, Thriller",
          },
          10: {
            // Squid Game -> shows Money Heist instead
            id: 10, // Keep original ID
            title: "Money Heist", // Wrong title
            image:
              "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg", // Wrong image
            description:
              "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
            year: "2017",
            cast: "Úrsula Corberó, Álvaro Morte, Itziar Ituño, Pedro Alonso, Paco Tous",
            genres: "Action, Crime, Drama, Mystery, Thriller",
          },
        };

        // If this is one of the buggy movies, add the wrong movie card (but keep original ID)
        const movieToAdd = buggyMovies[movie.id]
          ? { ...buggyMovies[movie.id], id: movie.id } // Ensure ID matches original for removal
          : movie;

        // Also add to Likes to mirror behavior (intentional debug)
        setLikedMovies((lm) =>
          lm.some((m) => m.id === movie.id) ? lm : [...lm, movie],
        );

        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Added to My List: ${movie.title}` },
          }),
        );
        return [...prev, movieToAdd];
      }
    });
  };

  const isInMyList = (movieId) => {
    return myList.some((m) => m.id === movieId);
  };

  const addToContinueWatching = (movie, progress = 0) => {
    // Intentional bug: some titles will add a different show/movie to Continue Watching
    const replacementMap = {
      // Wednesday -> Stranger Things
      4: 1,
      // The Witcher -> The Crown
      5: 2,
      // Breaking Bad -> Black Mirror
      3: 11,
      // Squid Game -> Money Heist
      10: 8,
      // The Last of Us -> Bridgerton
      9: 28,
    };

    const findMovieById = (id) => {
      if (!id) return null;
      if (featuredMovie && featuredMovie.id === id) return featuredMovie;
      for (const cat of movieCategories) {
        const found = (cat.movies || []).find((m) => m.id === id);
        if (found) return found;
      }
      return null;
    };

    setContinueWatching((prev) => {
      const targetId = replacementMap[movie.id];
      const movieToAdd = targetId ? findMovieById(targetId) || movie : movie;

      const existing = prev.find((m) => m.id === movieToAdd.id);
      if (existing) {
        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Resumed: ${movieToAdd.title}` },
          }),
        );
        return prev.map((m) =>
          m.id === movieToAdd.id
            ? { ...m, progress, lastWatched: Date.now() }
            : m,
        );
      } else {
        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Started: ${movieToAdd.title}` },
          }),
        );
        return [...prev, { ...movieToAdd, progress, lastWatched: Date.now() }];
      }
    });
  };

  const updateWatchProgress = (movieId, progress) => {
    setContinueWatching((prev) =>
      prev.map((m) =>
        m.id === movieId ? { ...m, progress, lastWatched: Date.now() } : m,
      ),
    );
  };

  const removeFromContinueWatching = (movieId) => {
    setContinueWatching((prev) => prev.filter((m) => m.id !== movieId));
  };

  const value = {
    likedMovies,
    myList,
    continueWatching,
    toggleLike,
    isLiked,
    toggleMyList,
    isInMyList,
    addToContinueWatching,
    updateWatchProgress,
    removeFromContinueWatching,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
