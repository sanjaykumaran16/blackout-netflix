import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { currentProfile } = useProfile();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/", { replace: true });
  };

  const openHelp = () => {
    setOpen(false);
    setHelpOpen(true);
  };

  useEffect(() => {
    if (!helpOpen) return;
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => {
      if (e.key === "Escape") setHelpOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [helpOpen]);

  return (
    <>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center text-white font-semibold hover:bg-netflix-red-dark transition-colors"
        >
          {currentProfile?.avatar || "D"}
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-netflix-black border border-gray-700 rounded shadow-xl py-2 z-50">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile-select");
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:underline flex items-center gap-2"
            >
              <span className="w-6 h-6 rounded bg-netflix-red flex items-center justify-center text-xs text-white">
                {currentProfile?.avatar}
              </span>
              Manage Profiles
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:underline block"
            >
              Account
            </button>
            <button
              type="button"
              onClick={openHelp}
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:underline block"
            >
              Help Center
            </button>
            <hr className="border-gray-700 my-2" />
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:underline"
            >
              Sign out of Netflix
            </button>
          </div>
        )}
      </div>

      {/* Help Center Modal */}
      {helpOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          onClick={() => setHelpOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-title"
        >
          <div
            className="bg-netflix-black border border-gray-700 rounded-lg shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h2 id="help-title" className="text-xl font-semibold text-white">
                Help Center
              </h2>
              <button
                onClick={() => setHelpOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4 overflow-y-auto text-gray-300 space-y-4">
              <p className="text-sm">
                Get help with your account, billing, and streaming.
              </p>
              <div>
                <h3 className="text-white font-medium mb-2">Contact us</h3>
                <p className="text-sm">
                  For account and billing questions, visit our help site or contact support.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">FAQ</h3>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>How do I reset my password?</li>
                  <li>How do I cancel my subscription?</li>
                  <li>Why isn’t my video playing?</li>
                  <li>How do I add a payment method?</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                This is a demo. In a real app, this would link to your help site.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
