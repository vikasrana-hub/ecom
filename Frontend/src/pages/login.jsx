import axios from "axios";
import { useState } from "react";
export default function Login(
  
) {
  const{email, setEmail} = useState("")
  const{password , setPassword} = useState("")
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <input
        onChange={(e) => {setEmail(e.target.value)}}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
        onChange={(e) => {setPassword(e.target.value)}}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={() => {
            const res = axios.post("http://localhost:3001/api/user/login", {
              email: email,
              password: password,
            })
            window.localStorage.setItem("token", res.data.token);
            window.location.href = "/user/home";
          }}
          
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/user/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
