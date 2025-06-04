import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserProfileCard() {
    const [user, setUser] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function userFetch() {
            try {
                const res = await axios.get("https://ecom-1-t5j1.onrender.com/api/user/profile", {
                    headers: {
                        authorization: window.localStorage.getItem("token"),
                    },
                });
                setUser(res.data.user);
                setCart(res.data.user.cart);
                toast.success("Profile loaded successfully!");
            } catch (error) {
                toast.error("Failed to load profile. Please try again.");
                console.error(error);
            }
        }
        userFetch();
    }, []);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 p-4">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
                    <div className="flex flex-col items-center">
                        <div className="rounded-full h-10 w-10 bg-red-100 text-red-600 flex items-center justify-center font-semibold cursor-pointer hover:bg-red-200 transition">
                            {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                        </div>
                        <h2 className="text-xl font-semibold mt-4">{user.email || "John"}</h2>

                        <button
                            className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition"
                            onClick={() => {
                                window.location.href = "/user/home";
                            }}
                        >
                            BACK
                        </button>
                    </div>

                    <div className="mt-6 text-left">
                        <h3 className="text-lg font-medium mb-2">Recent Orders</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {cart.length === 0 && <li>No recent orders found.</li>}
                            {cart.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{item.name || "pen"}</span>
                                    <span className="font-medium">₹{item.price || "12"}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
