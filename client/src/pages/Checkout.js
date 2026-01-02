import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext'; // ✅ Import Toast

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { showToast } = useToast(); // ✅ Use Toast
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const [form, setForm] = useState({
    address: '',
    city: '',
    pincode: ''
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if(!form.address || !form.city || !form.pincode) {
      showToast("Please fill all details! 📝", 'error');
      return;
    }

    // Success Magic ✨
    showToast("Order Placed Successfully! 🎉📦", 'success');
    clearCart(); 
    navigate('/'); 
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-24">
        <h2 className="text-3xl font-bold text-white">Your Cart is Empty! 🛒</h2>
        <p className="text-gray-400 mt-2">Add items to checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-20 flex flex-col md:flex-row gap-8">
      
      {/* Left: Address Form (Dark Mode) */}
      <div className="md:w-2/3 bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-2">
          Shipping Details 🚚
        </h2>
        
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-bold mb-2">Full Address</label>
            <textarea 
              className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400" 
              rows="3"
              placeholder="123, Gandhi Street, Madurai..."
              onChange={(e) => setForm({...form, address: e.target.value})}
            ></textarea>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-300 font-bold mb-2">City</label>
              <input 
                type="text" 
                className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400" 
                placeholder="Madurai"
                onChange={(e) => setForm({...form, city: e.target.value})}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-300 font-bold mb-2">Pincode</label>
              <input 
                type="text" 
                className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400" 
                placeholder="625001"
                onChange={(e) => setForm({...form, pincode: e.target.value})}
              />
            </div>
          </div>

          <h3 className="text-lg font-bold mt-4 text-gray-300">Payment Method</h3>
          <div className="flex items-center gap-3 p-4 border border-gray-600 rounded-xl bg-gray-700/50">
            <input type="radio" checked readOnly className="w-5 h-5 text-blue-500 accent-blue-500" />
            <span className="font-medium text-white">Cash on Delivery (COD) 💵</span>
          </div>

          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition shadow-lg transform hover:-translate-y-1">
            Confirm Order ✅
          </button>
        </form>
      </div>

      {/* Right: Order Summary (Dark Mode) */}
      <div className="md:w-1/3 bg-gray-800 p-8 rounded-2xl h-fit border border-gray-700 shadow-xl">
        <h3 className="text-xl font-bold mb-6 border-b border-gray-600 pb-4 text-white">Order Summary</h3>
        
        <div className="space-y-4 mb-6">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-300">
              <span>{item.name}</span>
              <span className="font-semibold text-white">₹{item.price}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-600 pt-4 space-y-2">
          <div className="flex justify-between text-gray-400">
             <span>Subtotal</span>
             <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between text-green-400 font-medium">
             <span>Shipping</span>
             <span>Free</span>
          </div>
        </div>

        <div className="flex justify-between text-2xl font-bold border-t border-gray-600 pt-6 mt-4 text-white">
          <span>Total Bill</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

    </div>
  );
};

export default Checkout;