import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchModal from "./SearchModal";
import ProfileDropdown from "./ProfileDropdown";
import NotificationsDropdown from "./NotificationsDropdown";
import MobileMenu from "./MobileMenu";

const Navbar = ({ onMovieClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open search with '/' shortcut when not typing in inputs
  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === "/" &&
        document.activeElement &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-netflix-black shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-4 md:gap-8">
          <MobileMenu />
          <h1
            onClick={() => navigate("/home")}
            className="text-netflix-red text-3xl md:text-4xl font-netflix font-bold tracking-wider cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            NETFLIX
          </h1>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li
              onClick={() => navigate("/home")}
              className={`cursor-pointer transition-colors duration-300 ${
                location.pathname === "/home"
                  ? "text-white font-medium"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => navigate("/tv-shows")}
              className={`cursor-pointer transition-colors duration-300 ${
                location.pathname === "/tv-shows"
                  ? "text-white font-medium"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              TV Shows
            </li>
            <li
              onClick={() => navigate("/tv-shows")}
              className={`cursor-pointer transition-colors duration-300 ${
                location.pathname === "/movies"
                  ? "text-white font-medium"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Movies
            </li>
            <li
              onClick={() => navigate("/new-popular")}
              className={`cursor-pointer transition-colors duration-300 ${
                location.pathname === "/new-popular"
                  ? "text-white font-medium"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              New & Popular
            </li>
            <li
              onClick={() => navigate("/my-list")}
              className={`cursor-pointer transition-colors duration-300 ${
                location.pathname === "/my-list"
                  ? "text-white font-medium"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              My List
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="text-white hover:text-gray-300 transition-colors duration-300"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <NotificationsDropdown />

          {/* Profile dropdown (includes Sign out) */}
          <ProfileDropdown />
        </div>
      </div>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onMovieClick={onMovieClick}
      />
    </nav>
  );
};

export default Navbar;
