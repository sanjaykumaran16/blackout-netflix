import { useEffect, useState } from "react";

const NowPlayingPopup = () => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    let timeout = null;
    const handler = (e) => {
      const title = e.detail?.title || "Now Playing";
      setItem({ title });
      clearTimeout(timeout);
      timeout = setTimeout(() => setItem(null), 3500);
    };

    window.addEventListener("netflix:nowPlaying", handler);
    return () => {
      window.removeEventListener("netflix:nowPlaying", handler);
      clearTimeout(timeout);
    };
  }, []);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-60 pointer-events-none flex items-start justify-center pt-28">
      <div className="pointer-events-auto bg-black/90 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
        <div className="font-semibold">{item.title} is playing</div>
      </div>
    </div>
  );
};

export default NowPlayingPopup;
