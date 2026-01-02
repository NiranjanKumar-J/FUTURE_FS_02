import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext'; // ✅ Toast Import

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      showToast("Account Created! Please Login 🎉", 'success');
      navigate('/login');
    } catch (err) {
      showToast("User already exists or Error ❌", 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      
      {/* Dark Card */}
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md transform hover:scale-[1.01] transition duration-300">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Join us and start shopping!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 font-bold mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full p-4 bg-gray-900 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-500"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full p-4 bg-gray-900 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-500"
              placeholder="john@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-4 bg-gray-900 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-500"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-500 transition shadow-lg shadow-purple-600/30">
            Sign Up ✨
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account? 
          <Link to="/login" className="text-purple-400 font-bold hover:underline ml-2">Login</Link>
        </p>
      </div>

    </div>
  );
};

export default Signup;