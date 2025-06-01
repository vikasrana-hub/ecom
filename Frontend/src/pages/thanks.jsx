import { Link } from 'react-router-dom';

export const ThankYou = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-blue-300 to-blue-400 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
                <div className="text-4xl">🎉</div>
                <h1 className="text-2xl font-bold text-gray-800">Thank You for Your Order!</h1>
                <p className="text-gray-600">
                    We've received your order and are preparing it for shipment. You'll receive a confirmation email shortly.
                </p>

                <div className="space-y-2">
                    <Link
                        to="/user/home"
                        className="block w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        to="/user/profile"
                        className="block w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition"
                    >
                        View Your Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};
