import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-56 min-h-screen bg-white shadow-md flex flex-col p-6">
      <h1 className="text-xl font-black text-gray-900 tracking-tight mb-8">
        FitTrack
      </h1>
      <nav className="flex flex-col gap-2">
        <Link
          to="/profile"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded transition-colors"
        >
          Profile
        </Link>
        <Link
          to="/templates"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded transition-colors"
        >
          Templates
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
