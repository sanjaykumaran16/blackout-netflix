import { createContext, useContext, useState, useEffect } from "react";

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
        return prev.filter((m) => m.id !== movie.id);
      } else {
        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Added to Likes: ${movie.title}` },
          }),
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
        return prev.filter((m) => m.id !== movie.id);
      } else {
        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Added to My List: ${movie.title}` },
          }),
        );
        return [...prev, movie];
      }
    });
  };

  const isInMyList = (movieId) => {
    return myList.some((m) => m.id === movieId);
  };

  const addToContinueWatching = (movie, progress = 0) => {
    setContinueWatching((prev) => {
      const existing = prev.find((m) => m.id === movie.id);
      if (existing) {
        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Resumed: ${movie.title}` },
          }),
        );
        return prev.map((m) =>
          m.id === movie.id ? { ...m, progress, lastWatched: Date.now() } : m,
        );
      } else {
        window.dispatchEvent(
          new CustomEvent("netflix:toast", {
            detail: { message: `Started: ${movie.title}` },
          }),
        );
        return [...prev, { ...movie, progress, lastWatched: Date.now() }];
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
