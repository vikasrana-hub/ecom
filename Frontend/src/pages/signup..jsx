import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        if (!firstname || !email || !password) {
            toast.warning("Please fill in all fields.");
            return;
        }

        try {
            const res = await axios.post("https://ecom-1-t5j1.onrender.com/api/user/signup", {
                firstname,
                email,
                password,
            });

            window.localStorage.setItem("token", res.data.token);
            toast.success("Signup successful! Redirecting...", {
                onClose: () => window.location.href = "/user/home",
                autoClose: 1500
            });
        } catch (err) {
            const msg = err.response?.data?.message || "Signup failed. Please try again.";
            toast.error(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Sign Up
                </h2>

                <input
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleSignup}
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-200"
                >
                    Sign Up
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a
                        href="/user/login"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
