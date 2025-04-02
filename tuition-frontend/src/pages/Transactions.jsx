import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://center-dashboard.onrender.com/api/auth/login", { email, password });
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-purple-900">
      <div className="relative p-8 rounded-xl shadow-2xl w-96 backdrop-blur-lg bg-black bg-opacity-30 border border-purple-500 border-opacity-20">
        {/* Glassmorphic effect elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-purple-600 blur-3xl opacity-20"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-indigo-600 blur-3xl opacity-20"></div>
        
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Admin Login</h2>
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-4 rounded-lg bg-gray-800 bg-opacity-50 border border-purple-500 border-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-4 rounded-lg bg-gray-800 bg-opacity-50 border border-purple-500 border-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 shadow-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;