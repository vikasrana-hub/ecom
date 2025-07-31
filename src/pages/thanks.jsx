import { Link } from 'react-router-dom';

export const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-400 via-blue-300 to-sky-200 px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md w-full text-center space-y-6">
        <div className="text-5xl sm:text-6xl">🎉</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          We’ve received your order and are preparing it for shipment. A confirmation email will be sent shortly.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/user/home"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Continue Shopping
          </Link>
          <Link
            to="/user/profile"
            className="w-full border border-blue-600 text-blue-600 py-2.5 rounded-lg font-medium hover:bg-blue-100 transition duration-200"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    </div>
  );
};
