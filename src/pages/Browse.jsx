import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Row from '../components/Row';
import MovieModal from '../components/MovieModal';
import VideoPlayer from '../components/VideoPlayer';
import { useUserPreferences } from '../context/UserPreferencesContext';
import {
  getCategoriesForSection,
  SECTION_TV_SHOWS,
  SECTION_MOVIES,
  SECTION_NEW_POPULAR,
} from '../utils/browseData';

const SECTION_TITLES = {
  [SECTION_TV_SHOWS]: 'TV Shows',
  [SECTION_MOVIES]: 'Movies',
  [SECTION_NEW_POPULAR]: 'New & Popular',
};

const PATH_TO_SECTION = {
  '/tv-shows': SECTION_TV_SHOWS,
  '/movies': SECTION_MOVIES,
  '/new-popular': SECTION_NEW_POPULAR,
};

const Browse = () => {
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playingMovie, setPlayingMovie] = useState(null);
  const { continueWatching, addToContinueWatching } = useUserPreferences();

  const validSection = PATH_TO_SECTION[location.pathname] || SECTION_NEW_POPULAR;

  const categories = getCategoriesForSection(validSection);
  const pageTitle = SECTION_TITLES[validSection] || 'Browse';

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handlePlay = (movie) => {
    addToContinueWatching(movie, 0);
    setSelectedMovie(null);
    setPlayingMovie(movie);
  };

  const sortedContinueWatching = [...continueWatching].sort(
    (a, b) => (b.lastWatched || 0) - (a.lastWatched || 0)
  );

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar onMovieClick={handleMovieClick} />
      <main className="pt-24 pb-12">
        <div className="px-4 md:px-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{pageTitle}</h1>
          <p className="text-gray-400 mt-1">
            {validSection === SECTION_TV_SHOWS &&
              'Series and shows to binge'}
            {validSection === SECTION_MOVIES && 'Films and documentaries'}
            {validSection === SECTION_NEW_POPULAR &&
              'Trending and popular titles'}
          </p>
        </div>
        <div className="relative z-10 pb-12">
          {sortedContinueWatching.length > 0 && (
            <Row
              title="Continue Watching"
              movies={sortedContinueWatching}
              onMovieClick={handleMovieClick}
              showProgress={true}
            />
          )}
          {categories.map((category) => (
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
        <MovieModal movie={selectedMovie} onClose={closeModal} onPlay={() => handlePlay(selectedMovie)} />
      )}
      {playingMovie && (
        <VideoPlayer movie={playingMovie} onClose={() => setPlayingMovie(null)} onNext={() => { addToContinueWatching(playingMovie, 100); setPlayingMovie(null); }} />
      )}
    </div>
  );
};

export default Browse;
