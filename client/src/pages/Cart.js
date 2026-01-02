import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ Initialize Hook

  // Calculate Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center mt-24">
        <h2 className="text-2xl font-bold text-gray-700">Your Cart is Empty! 😕</h2>
        <Link to="/" className="text-blue-600 underline mt-4 block">Go Shopping 🛍️</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Shopping Cart ({cart.length} items)</h2>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Side: Cart Items List */}
        <div className="md:w-3/4 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-4 shadow-sm rounded-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-bold text-blue-600">₹{item.price}</span>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm"
                >
                  Remove ❌
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Total Bill */}
        <div className="md:w-1/4 h-fit bg-white p-6 shadow-md rounded-lg border border-gray-100">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Order Summary</h3>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between mb-4 text-green-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t pt-4">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
          
          {/* ✅ Updated Checkout Button */}
          <button 
            onClick={() => navigate('/checkout')} 
            className="w-full bg-black text-white py-3 mt-6 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg active:scale-95"
          >
            Checkout Now 💳
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;