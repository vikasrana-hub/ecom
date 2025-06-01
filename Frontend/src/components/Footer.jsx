export const Footer = () => {
    return (
        <footer className="bg-white bg-gradient-to-bl from-blue-400 to-blue-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-gray-600 dark:text-gray-300 text-sm">
                {/* Left Side: Copyright */}
                <div className="mb-2 sm:mb-0">
                    © {new Date().getFullYear()} <span className="font-semibold">Inferno Lite</span>. All rights reserved.
                </div>

                {/* Right Side: Links */}
                <div className="flex space-x-4">
                    <a href="/about" className="hover:text-red-500 transition">About</a>
                    <a href="/contact" className="hover:text-red-500 transition">Contact</a>
                    <a href="/privacy" className="hover:text-red-500 transition">Privacy</a>
                </div>
            </div>
        </footer>
    );
};
