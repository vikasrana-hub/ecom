import { useState } from 'react';

export const Appbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header className="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="Open menu"
            >
              <div className="space-y-1">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
                  />
                ))}
              </div>
            </button>

            {/* Logo */}
            <div className="flex-1 flex justify-center md:justify-start">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer">
                INFERNO <span className="text-red-500 drop-shadow-md">CART</span>
              </h1>
            </div>

            {/* Action Icons */}
            <div className="hidden md:flex space-x-4 items-center">
              <a href="/user/login" className="icon-btn">
                <UserIcon />
              </a>
              <a href="/" className="icon-btn relative">
                <CartIcon />
                {/* Example item count */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  3
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-4xl mx-auto px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full py-3 px-6 pr-12 rounded-full bg-white/95 shadow-md border focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 transition">
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in Side Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Hello, User!</h3>
            <p className="text-sm text-purple-100">Welcome back</p>
          </div>
          <button onClick={() => setMenuOpen(false)} className="hover:scale-110 transition">
            <CloseIcon />
          </button>
        </div>

        {/* Links */}
        <nav className="p-6 space-y-4">
          {[
            { to: "/user/home", label: "Home", icon: "🏠" },
            { to: "/user/profile", label: "Profile", icon: "👤" },
            { to: "/user/cart", label: "Cart", icon: "🛒" },
            { to: "/ProductUpload", label: "Upload", icon: "⬆️" },
            { to: "/user/login", label: "Logout", icon: "🚪", action: handleLogout }
          ].map((item) => (
            <a
              key={item.label}
              href={item.to}
              onClick={() => {
                setMenuOpen(false);
                item.action && item.action();
              }}
              className="flex items-center space-x-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-lg transition-all"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full text-center p-4 text-sm text-gray-400 bg-gray-50 border-t">
          Made with ❤️ for shopping
        </div>
      </aside>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .icon-btn {
          @apply p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-transform hover:scale-110;
        }
      `}</style>
    </>
  );
};

// Icons (can move to separate file if needed)
const UserIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M7 17v1a1 1 0 001 1h8a1 1 0 001-1v-1a3 3 0 00-3-3h-4a3 3 0 00-3 3Zm8-9a3 3 0 11-6 0 3 3 0 016 0Z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4Zm8 0a2 2 0 100 4 2 2 0 000-4Zm-8.5-3h9.25L19 7H7.312" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
