import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-56 min-h-screen bg-white shadow-md flex flex-col p-6 dark:bg-gray-800">
      <h1 className="text-xl font-black text-gray-900 tracking-tight mb-8 dark:text-white">
        FitTrack
      </h1>
      <nav className="flex flex-col gap-2">
        <Link
          to="/profile"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Profile
        </Link>
        <Link
          to="/templates"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Templates
        </Link>
        <Link
          to="/settings"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Settings
        </Link>
      </nav>

      <button
        onClick={toggleTheme}
        className="mt-auto text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 rounded transition-colors"
      >
        {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
      </button>
    </div>
  );
}

export default Navbar;
