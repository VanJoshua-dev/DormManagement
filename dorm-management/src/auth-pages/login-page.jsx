import React, { useState } from "react";
import { motion } from "framer-motion";
import bg from "../assets/loginBg.jpg";
import logo from "../assets/dormLogo.png";
import useLogin from "../services/auth-services";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {loading, handleSubmit} = useLogin({username, password});
  return (
    <div
      className="min-h-screen bg-cover bg-center pt-35 md:pt-30 px-5 flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Animated Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white rounded-md shadow-lg px-8 py-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Dormitory Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          Dormitory Management
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                onChange={() => setShowPassword(!showPassword)}
              />
              <span className="text-sm text-gray-600">Show password</span>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            
            className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-sm text-lg hover:bg-blue-600 transition"
          >
            {loading ? "Checking...": "Login"}
            
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginPage;
