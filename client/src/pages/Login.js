import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext'; // ✅ Import Toast Hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showToast } = useToast(); // ✅ Use the Hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API Request to Backend
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Update Auth Context
      login(res.data.token, res.data.user);
      
      // ✅ SUCCESS TOAST (Replaces Alert)
      showToast(`Welcome back, ${res.data.user.name}! 👋`, 'success');
      
      // Redirect to Home
      navigate('/');
      
    } catch (err) {
      // ✅ ERROR TOAST (Replaces Alert)
      console.error(err);
      showToast("Invalid Email or Password ❌", 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      
      {/* Dark Card Container */}
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md transform hover:scale-[1.01] transition duration-300">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Login to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label className="block text-gray-300 font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full p-4 bg-gray-900 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-500"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-300 font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-4 bg-gray-900 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-600/30 active:scale-95">
            Login Now 🚀
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-400 mt-6">
          Don't have an account? 
          <Link to="/signup" className="text-blue-400 font-bold hover:underline ml-2">Sign Up</Link>
        </p>
      </div>

    </div>
  );
};

export default Login;