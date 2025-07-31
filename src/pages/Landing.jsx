import { Heart, Shield, ShoppingBag, Star, Truck, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const LandingPage = ({ user }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentOffer, setCurrentOffer] = useState(0);

    const offers = [
        "🔥 MEGA SALE: Up to 80% OFF on Electronics!",
        "⚡ Flash Deal: Buy 2 Get 1 FREE on Fashion!",
        "🎯 Special Offer: Free Delivery on orders above ₹499!",
        "💝 New User Bonus: Extra 20% OFF on first purchase!"
    ];

    const features = [
        { icon: <Truck className="w-6 h-6" />, text: "Free Delivery" },
        { icon: <Shield className="w-6 h-6" />, text: "Secure Payment" },
        { icon: <Star className="w-6 h-6" />, text: "Top Quality" },
        { icon: <Zap className="w-6 h-6" />, text: "Fast Service" }
    ];

    const categories = [
        { name: "Electronics", emoji: "📱", color: "from-blue-500 to-purple-600" },
        { name: "Fashion", emoji: "👗", color: "from-pink-500 to-red-500" },
        { name: "Home & Living", emoji: "🏠", color: "from-green-500 to-teal-500" },
        { name: "Beauty", emoji: "💄", color: "from-purple-500 to-pink-500" }
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentOffer((prev) => (prev + 1) % offers.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleNavigate = (path, message) => {
        // Toast simulation - in real app, use react-toastify
        console.log(message);
        // Navigate logic here
    };

    const showToast = (message, type = 'success') => {
        // Toast simulation
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        }`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(full)';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    };

   

    return ( 
        <div className="min-h-screen relative overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-90"></div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    >
                        <div className="w-2 h-2 bg-white rounded-full opacity-30"></div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Top Banner */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 overflow-hidden">
                    <div className="animate-pulse text-center font-bold">
                        {offers[currentOffer]}
                    </div>
                </div>

                {/* Header */}
                <header className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md">
                    <div className="flex items-center space-x-2">
                        <ShoppingBag className="w-8 h-8 text-orange-500" />
                        <span className="text-2xl font-bold text-white">InFerno Cart</span>
                    </div>
                    {user && (
                        <div className="flex items-center space-x-4">
                            <Heart className="w-6 h-6 text-white cursor-pointer hover:text-red-500 transition-colors" />
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                        </div>
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
                    <div className={`max-w-6xl w-full text-center transition-all duration-1000 transform ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        
                        {/* Hero Section */}
                        <div className="space-y-8 mb-12">
                            <h1 className="text-6xl sm:text-7xl font-extrabold text-white leading-tight">
                                Shop the
                                <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                                    Future
                                </span>
                            </h1>
                            
                            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                                {user 
                                    ? `Welcome back, ${user.name}! Discover amazing deals waiting just for you 🎉`
                                    : 'Discover millions of products at unbeatable prices. Your shopping paradise awaits!'
                                }
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className={`flex flex-col items-center space-y-2 p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 ${
                                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="text-orange-400">
                                        {feature.icon}
                                    </div>
                                    <span className="text-white text-sm font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Categories */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
                            {categories.map((category, index) => (
                                <div onClick={()=>(window.location.href='/user/Home')}
                                    key={index}
                                    className={`group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl text-white text-center hover:shadow-2xl transition-all duration-300`}>
                                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                            {category.emoji}
                                        </div>
                                        <h3 className="font-bold text-lg">{category.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-6">
                            {!user ? (
                                <div className="flex flex-wrap justify-center gap-4">
                                    <button
                                        onClick={() => {window.location.href='/user/login'}}
                                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10">Login to Shop</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </button>
                                    
                                    <button
                                        onClick={() => {window.location.href='/user/signup'}}
                                        className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10">Join InFerno Cart</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </button>
                                    
                                    <button
                                        onClick={() => {window.location.href='/adminlogin'}}
                                        className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                                    >
                                        Admin Access
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <button
                                        onClick={() => handleButtonClick('/user/home', 'Taking you to shopping paradise')}
                                        className="group relative px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center space-x-2">
                                            <ShoppingBag className="w-6 h-6" />
                                            <span>Start Shopping</span>
                                            <Zap className="w-6 h-6" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </button>
                                    
                                    <p className="text-orange-300 font-medium animate-pulse">
                                        🎁 Special offers just for you inside!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                            {[
                                { number: "10M+", label: "Happy Customers" },
                                { number: "50K+", label: "Products" },
                                { number: "99.9%", label: "Uptime" }
                            ].map((stat, index) => (
                                <div 
                                    key={index}
                                    className={`text-center transition-all duration-1000 transform ${
                                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${800 + index * 200}ms` }}
                                >
                                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                                    <div className="text-gray-300 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center py-6 text-gray-300 bg-black/20 backdrop-blur-md">
                    <p>&copy; 2024 InFerno Cart. Making shopping a delightful experience.</p>
                </footer>
            </div>

            <style jsx>{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% {
                        transform: translate3d(0,0,0);
                    }
                    40%, 43% {
                        transform: translate3d(0,-30px,0);
                    }
                    70% {
                        transform: translate3d(0,-15px,0);
                    }
                    90% {
                        transform: translate3d(0,-4px,0);
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;