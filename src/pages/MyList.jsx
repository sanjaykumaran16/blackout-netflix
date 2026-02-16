import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Row from "../components/Row";
import MovieModal from "../components/MovieModal";
import { useUserPreferences } from "../context/UserPreferencesContext";

const MyList = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { myList, likedMovies, addToContinueWatching } = useUserPreferences();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar onMovieClick={handleMovieClick} />

      <main className="pt-24 pb-12">
        <div className="px-4 md:px-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My List
          </h1>
          <p className="text-gray-400">
            {myList.length > 0
              ? `${myList.length} ${myList.length === 1 ? "title" : "titles"} in your list`
              : "Your list is empty. Add titles to watch later."}
          </p>
        </div>

        {myList.length > 0 ? (
          <Row title="" movies={myList} onMovieClick={handleMovieClick} />
        ) : (
          <div className="px-4 md:px-12 text-center py-20">
            <svg
              className="w-24 h-24 mx-auto text-gray-600 mb-4"
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
            <h2 className="text-2xl font-semibold text-white mb-2">
              Your List is Empty
            </h2>
            <p className="text-gray-400 mb-6">
              Add movies and shows to your list to watch them later.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="bg-netflix-red hover:bg-netflix-red-dark text-white px-6 py-2 rounded font-semibold transition-colors duration-300"
            >
              Browse Titles
            </button>
          </div>
        )}

        {/* Liked Movies Section */}
        {likedMovies.length > 0 && (
          <div className="mt-12">
            <div className="px-4 md:px-12 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Liked Movies
              </h2>
            </div>
            <Row
              title=""
              movies={likedMovies}
              onMovieClick={handleMovieClick}
            />
          </div>
        )}
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

export default MyList;
