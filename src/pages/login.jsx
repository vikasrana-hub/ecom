import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://ecom-1-t5j1.onrender.com/api/user/login", {
        email,
        password,
      });

      toast.success("Login successful!", { autoClose: 1500 });
      window.localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        window.location.href = "/user/home";
      }, 1600);
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">
          Welcome Back 👋
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/user/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}
