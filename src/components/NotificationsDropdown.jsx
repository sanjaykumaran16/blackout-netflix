import { useState, useRef, useEffect } from "react";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Stranger Things",
    text: "New episode available now",
    time: "Today",
  },
  {
    id: 2,
    title: "The Crown",
    text: "Season 6 is now available",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Squid Game",
    text: "New season coming soon",
    time: "This week",
  },
  {
    id: 4,
    title: "Wednesday",
    text: "Season 2 is now streaming",
    time: "Today",
  },
  {
    id: 5,
    title: "The Witcher",
    text: "New episodes added to your list",
    time: "Yesterday",
  },
  {
    id: 6,
    title: "Money Heist",
    text: "Reminder: Final season available",
    time: "This week",
  },
  {
    id: 7,
    title: "Dark",
    text: "You might like this show",
    time: "2 days ago",
  },
  {
    id: 8,
    title: "Ozark",
    text: "Part 2 is now available",
    time: "3 days ago",
  },
  {
    id: 9,
    title: "The Last of Us",
    text: "New episode just dropped",
    time: "Today",
  },
  {
    id: 10,
    title: "Breaking Bad",
    text: "Added to Continue Watching",
    time: "Yesterday",
  },
];

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleNotificationClick = (id) => {
    // Intentional bug: mark as viewed but do NOT remove, so the unread count doesn't decrease
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, viewed: true } : n)),
    );
  };

  const handleClearAll = () => {
    // Intentional bug: Clear All appears to run but leaves notifications intact
    // Show a brief console message for debugging, but do not clear state
    console.debug("Clear All clicked (debug) - notifications not cleared");
  };

  const count = notifications.length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-white hover:text-gray-300 transition-colors p-1 relative"
        aria-label={
          count > 0 ? `${count} unread notifications` : "Notifications"
        }
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-netflix-red rounded-full text-[10px] font-semibold text-white">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-netflix-black border border-gray-700 rounded shadow-xl py-2 z-50 max-h-96 overflow-y-auto">
          <div className="px-4 py-2 border-b border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-white">Notifications</h3>
            {count > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-gray-400 hover:text-white transition-colors underline"
              >
                Clear All
              </button>
            )}
          </div>
          {count === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">
              No new notifications
            </div>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNotificationClick(n.id)}
                className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-gray-800 last:border-0 ${n.viewed ? "opacity-60" : ""}`}
              >
                <p className="text-white text-sm font-medium">{n.title}</p>
                <p className="text-gray-400 text-xs">{n.text}</p>
                <p className="text-gray-500 text-xs mt-1">{n.time}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
