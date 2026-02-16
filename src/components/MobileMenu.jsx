import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LINKS = [
  { path: '/home', label: 'Home' },
  { path: '/tv-shows', label: 'TV Shows' },
  { path: '/movies', label: 'Movies' },
  { path: '/new-popular', label: 'New & Popular' },
  { path: '/my-list', label: 'My List' },
];

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-white p-2"
        aria-label="Menu"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-netflix-black z-50 shadow-xl pt-16 px-4">
            {LINKS.map(({ path, label }) => (
              <button
                key={path}
                onClick={() => go(path)}
                className={`block w-full text-left py-3 px-2 rounded transition-colors ${
                  location.pathname === path ? 'text-white font-medium bg-white/10' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
