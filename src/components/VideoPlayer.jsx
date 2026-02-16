import { useState, useEffect } from 'react';

const VideoPlayer = ({ movie, onClose, onNext }) => {
  const [progress, setProgress] = useState(0);
  const [showSkipIntro, setShowSkipIntro] = useState(true);
  const [showNextEpisode, setShowNextEpisode] = useState(false);
  const [nextCountdown, setNextCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setShowNextEpisode(true);
          return 100;
        }
        return p + 0.5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showNextEpisode) return;
    const t = setInterval(() => {
      setNextCountdown((c) => {
        if (c <= 0) {
          clearInterval(t);
          onNext?.();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [showNextEpisode, onNext]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <span className="text-white font-medium truncate max-w-[60%]">{movie?.title}</span>
        <div className="w-10" />
      </div>

      {/* Skip Intro button - show for first 15% then hide */}
      {showSkipIntro && progress < 15 && (
        <button
          onClick={() => setProgress(15)}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-10 px-6 py-2 bg-white/90 text-black font-semibold rounded hover:bg-white transition-colors"
        >
          Skip Intro
        </button>
      )}

      {/* Video area - placeholder */}
      <div className="flex-1 flex items-center justify-center bg-netflix-black">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white/80 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-gray-400">Playing: {movie?.title}</p>
        </div>
      </div>

      {/* Next episode countdown overlay */}
      {showNextEpisode && (
        <div className="absolute bottom-24 right-8 z-10 bg-black/80 rounded px-4 py-3 flex items-center gap-3">
          <span className="text-white text-sm">Next episode in {nextCountdown}</span>
          <button
            onClick={onNext}
            className="px-3 py-1 bg-white text-black text-sm font-semibold rounded"
          >
            Play Now
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
        <div
          className="h-full bg-netflix-red transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
