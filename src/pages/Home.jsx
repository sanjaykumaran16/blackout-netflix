import { useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import MovieModal from "../components/MovieModal";
import { useUserPreferences } from "../context/UserPreferencesContext";
import {
  getCategoriesForSection,
  getRecommendationsFor,
} from "../utils/browseData";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { continueWatching, addToContinueWatching } = useUserPreferences();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handlePlay = (movie) => {
    addToContinueWatching(movie, 0);
    setSelectedMovie(null);
  };

  const sortedContinueWatching = [...continueWatching].sort(
    (a, b) => (b.lastWatched || 0) - (a.lastWatched || 0),
  );

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar onMovieClick={handleMovieClick} />

      <main>
        <Banner onMovieClick={handleMovieClick} onPlay={handlePlay} />

        <div className="relative z-10 -mt-32 pb-12">
          {sortedContinueWatching.length > 0 && (
            <Row
              title="Continue Watching"
              movies={sortedContinueWatching}
              onMovieClick={handleMovieClick}
              showProgress={true}
            />
          )}

          {/* Because you watched - one row per recent watch */}
          {sortedContinueWatching.slice(0, 3).map((item) => {
            const recs = getRecommendationsFor(item.id, 8);
            if (recs.length === 0) return null;
            return (
              <Row
                key={`because-${item.id}`}
                title={`Because you watched ${item.title}`}
                movies={recs}
                onMovieClick={handleMovieClick}
              />
            );
          })}

          {getCategoriesForSection("home").map((category) => (
            <Row
              key={category.title}
              title={category.title}
              movies={category.movies}
              onMovieClick={handleMovieClick}
            />
          ))}
        </div>
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal}
          onPlay={() => handlePlay(selectedMovie)}
        />
      )}

      {/* Video player intentionally removed — Play now shows a temporary popup only. */}
    </div>
  );
};

export default Home;
