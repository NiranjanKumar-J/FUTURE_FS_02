import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20 pt-10 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Namma Kadai 🛍️</h2>
          <p className="text-gray-400">
            Your one-stop destination for all things trendy. 
            Quality products, fast delivery, and best prices.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">Cart</li>
            <li className="hover:text-white cursor-pointer transition">My Orders</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400">123, Tech Park, Madurai, India</p>
          <p className="text-gray-400 mt-2">support@nammakadai.com</p>
          <p className="text-gray-400 mt-2">+91 98765 43210</p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
        © 2026 Namma Kadai Inc. All rights reserved. Made with ❤️ in Madurai.
      </div>
    </footer>
  );
};

export default Footer;