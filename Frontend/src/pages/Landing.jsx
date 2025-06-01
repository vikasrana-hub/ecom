import { useNavigate } from 'react-router-dom';

const LandingPage = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col justify-center items-center px-4">
            <div className="max-w-4xl w-full text-center space-y-10 py-10">

                {/* Hero Title */}
                <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 tracking-tight">
                    Welcome to <span className="text-purple-600">InFerno Cart</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-gray-700">
                    {user
                        ? `Hello, ${user.name}! Happy shopping!`
                        : 'Find top deals on your favorite items. Shop smart. Shop fast.'}
                </p>

                {/* Buttons */}
                {!user && (
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <button
                            onClick={() => navigate('/user/login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/user/signup')}
                            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-lg font-semibold"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => navigate('/adminlogin')}
                            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-lg font-semibold"
                        >
                            Login as Admin
                        </button>
                    </div>
                )}

                {user && (
                    <div className="pt-4">
                        <button
                            onClick={() => navigate('/user/home')}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
                        >
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
