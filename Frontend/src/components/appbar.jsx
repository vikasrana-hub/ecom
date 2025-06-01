import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Appbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/user/login');
  };

  return (
    <header className="shadow-md bg-white bg-gradient-to-bl from-blue-300 to-blue-400 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        {/* Left: Logo */}
        <div className="text-xl font-bold tracking-wide">
          InFerno <span className="text-red-600">Cart</span>
        </div>

        {/* Center: Nav Links (hidden on mobile) */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/user/home" className="hover:text-red-600 transition">Home</Link>
          <Link to="/user/profile" className="hover:text-red-600 transition">Profile</Link>
          <Link to="/user/cart" className="hover:text-red-600 transition">Cart</Link>
        </nav>

        {/* Right: Avatar + Dropdown */}
        <div className="flex items-center space-x-4">
          <span className="hidden sm:block">Hello</span>

          <div className="relative group">
            <div className="rounded-full h-10 w-10 bg-red-100 text-red-600 flex items-center justify-center font-semibold cursor-pointer hover:bg-red-200 transition">
              U
            </div>
            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-2 hidden group-hover:flex bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg p-2 z-50">
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pb-4 space-y-2 font-medium">
          <Link to="/user/home" className="block hover:text-red-600 transition">Home</Link>
          <Link to="/user/profile" className="block hover:text-red-600 transition">Profile</Link>
          <Link to="/user/cart" className="block hover:text-red-600 transition">Cart</Link>
          <Link to="/ProductUpload" className="block hover:text-red-600 transition">Upload</Link>
        </div>
      )}
    </header>
  );
};
