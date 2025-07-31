import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserProfileCard() {
  const [user, setUser] = useState({ email: "", cart: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function userFetch() {
      try {
        const res = await axios.get("https://ecom-1-t5j1.onrender.com/api/user/profile", {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        });
        setUser(res.data.user);
        toast.success("Profile loaded successfully!");
      } catch (error) {
        toast.error("Failed to load profile. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    userFetch();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-indigo-300 p-6">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-lg shadow-2xl rounded-3xl p-6 border border-white/30 text-center animate-fade-in">
        {loading ? (
          <div className="text-indigo-700 font-semibold">Loading profile...</div>
        ) : (
          <>
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold shadow-md">
                {user?.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>

            {/* Email */}
            <h2 className="text-2xl font-semibold mt-4 text-gray-800">
              {user?.email || "User"}
            </h2>

            {/* Back Button */}
            <button
              onClick={() => (window.location.href = "/user/home")}
              className="mt-6 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-full shadow-md hover:from-indigo-600 hover:to-purple-600 transition-transform transform hover:scale-105"
            >
              Back to Home
            </button>

            {/* Cart Items */}
            <div className="mt-8 text-left">
              <h3 className="text-lg font-semibold mb-4 text-indigo-800">🛍️ Recent Orders</h3>
              <ul className="space-y-3">
                {user.cart?.length === 0 ? (
                  <li className="text-gray-600">No recent orders found.</li>
                ) : (
                  user.cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white/60 p-3 rounded-xl shadow-sm border border-white/20"
                    >
                      <span className="text-gray-800 font-medium">
                        {item.name || "Item"}
                      </span>
                      <span className="text-gray-900 font-semibold">
                        ₹{item.price || "00"}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
