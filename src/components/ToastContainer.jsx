import { useEffect, useState } from "react";

const Toast = ({ id, message, onClose }) => (
  <div className="bg-white/95 text-black px-4 py-2 rounded shadow-md flex items-center gap-3">
    <div className="text-sm">{message}</div>
    <button
      onClick={() => onClose(id)}
      className="text-gray-600 hover:text-black"
    >
      ✕
    </button>
  </div>
);

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, message: e.detail?.message || "" }]);
      // auto remove
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 3500);
    };

    window.addEventListener("netflix:toast", handler);
    return () => window.removeEventListener("netflix:toast", handler);
  }, []);

  const remove = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <Toast key={t.id} id={t.id} message={t.message} onClose={remove} />
      ))}
    </div>
  );
};

export default ToastContainer;
