import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext); // ✅ Get User
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 shadow-lg fixed w-full top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-blue-400 tracking-wide hover:text-blue-300 transition">
          Namma Kadai 🛍️
        </Link>

        <div className="flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white font-medium transition duration-300">Home</Link>
          
          <Link to="/cart" className="relative flex items-center text-gray-300 hover:text-white font-medium transition duration-300">
            <span className="text-2xl">🛒</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border border-gray-800">
                {cart.length}
              </span>
            )}
          </Link>

          {/* ✅ USER LOGIC HERE */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-blue-300 font-bold hidden sm:block border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/10">
                Hi, {user.name} 👋
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:bg-red-700 transition text-sm shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-500/30">
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;