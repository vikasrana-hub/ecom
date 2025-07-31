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
        <div className="relative min-h-screen flex items-center justify-center bg-[#f0f4ff] overflow-hidden">
            {/* Animated blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>

            {/* Form container */}
            <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create your account
                </h2>

                <input
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <button
                    onClick={handleSignup}
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-300"
                >
                    Sign Up
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a
                        href="/user/login"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Login
                    </a>
                </p>
            </div>

            {/* Tailwind animation extension (optional) */}
            <style>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                .animate-blob {
                    animation: blob 8s infinite ease-in-out;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}
