import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(CartContext);

  const categories = [
    "Electronics", "Men's Wear", "women's wear", "Footwear",
    "Accessories", "Home & Kitchen", "Sports", "Toys"
  ];

  useEffect(() => {
    axios.get('https://future-fs-02-pi-bice.vercel.app/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900"> 
      
      {/* 🌟 HERO SECTION 🌟 */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* ✅ NEW BANNER IMAGE (Dark Luxury Fashion) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Shopping Background" 
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[20s]" 
          />
          {/* Dark Overlay (Adjusted for better text visibility) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl w-full mt-10">
          <p className="text-blue-400 font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm animate-pulse">
            Exclusive Collection 2026
          </p>
          <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Redefine Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Signature Look</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Experience the perfect blend of luxury, comfort, and technology.
          </p>
          
          {/* ✨ PROFESSIONAL SVG ICONS ✨ */}
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 text-gray-300">
            
            {/* Feature 1: Fast Delivery */}
            <div className="flex flex-col items-center gap-3 group cursor-pointer hover:text-white transition">
              <div className="p-4 rounded-full border border-gray-600 bg-gray-800/40 backdrop-blur-md group-hover:border-blue-500 group-hover:bg-blue-600/10 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 group-hover:text-blue-400 transition">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-3.375h-5.845c-.969 0-1.764-.5-2.261-1.251-.496-.751-.69-1.636-.554-2.584.183-1.28.784-2.43 1.666-3.328A2.25 2.25 0 019.25 5h2.828c.84 0 1.623.42 2.122 1.135l.022.03.022-.03c.499-.715 1.282-1.135 2.122-1.135h2.25" />
                </svg>
              </div>
              <span className="font-medium tracking-wider text-xs uppercase">Express Shipping</span>
            </div>

            {/* Feature 2: Premium Quality */}
            <div className="flex flex-col items-center gap-3 group cursor-pointer hover:text-white transition">
              <div className="p-4 rounded-full border border-gray-600 bg-gray-800/40 backdrop-blur-md group-hover:border-purple-500 group-hover:bg-purple-600/10 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 group-hover:text-purple-400 transition">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <span className="font-medium tracking-wider text-xs uppercase">Premium Quality</span>
            </div>

            {/* Feature 3: Secure Payment */}
            <div className="flex flex-col items-center gap-3 group cursor-pointer hover:text-white transition">
              <div className="p-4 rounded-full border border-gray-600 bg-gray-800/40 backdrop-blur-md group-hover:border-green-500 group-hover:bg-green-600/10 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 group-hover:text-green-400 transition">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016A11.959 11.959 0 0112 2.714z" />
                </svg>
              </div>
              <span className="font-medium tracking-wider text-xs uppercase">Secure Payment</span>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce text-gray-500">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-2 text-center opacity-60">Scroll Down</p>
          <svg className="w-6 h-6 mx-auto opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div>

      <div className="container mx-auto p-4 mt-16">
        
        {/* 🔍 SEARCH BAR */}
        <div className="mb-20 flex justify-center">
          <div className="relative w-full md:w-2/3 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <input 
              type="text"
              placeholder="Search for products (e.g., Watch, Shoes)..."
              className="relative w-full p-4 pl-14 bg-gray-900 text-gray-100 border border-gray-700 rounded-full shadow-2xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition placeholder-gray-600 text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-6 top-5 text-gray-500 text-xl group-focus-within:text-blue-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
          </div>
        </div>

        {/* 🛍️ PRODUCT CATEGORIES */}
        {categories.map((category) => {
          const filteredProducts = products.filter(item => 
            item.category === category && 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredProducts.length === 0) return null;

          return (
            <div key={category} className="mb-20">
              
              <div className="flex items-center mb-10">
                <h2 className="text-3xl font-bold text-white border-l-4 border-blue-500 pl-4 tracking-wide">
                  {category}
                </h2>
                <div className="flex-grow border-t border-gray-800 ml-6"></div>
                <Link to="#" className="text-sm text-blue-400 hover:text-blue-300 font-medium ml-4 transition hidden sm:block">View All →</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  
                  // ✨ DARK PREMIUM CARD
                  <div key={product._id} className="bg-gray-800 rounded-xl shadow-lg hover:shadow-blue-900/20 transition-all duration-300 group overflow-hidden border border-gray-700/40">
                    
                    <Link to={`/product/${product._id}`}>
                      <div className="h-72 overflow-hidden bg-gray-900/50 flex justify-center items-center relative p-8">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
                        />
                        {/* Elegant New Badge */}
                        <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          New Arrival
                        </span>
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-2">{product.category}</p>
                      <h3 className="text-lg font-bold text-gray-100 truncate mb-3 group-hover:text-blue-400 transition">{product.name}</h3>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-white tracking-tight">₹{product.price}</span>
                          <span className="text-xs text-gray-500 line-through mt-0.5">₹{product.price * 1.2}</span>
                        </div>
                        
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-white text-black p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center group-hover:rotate-90"
                          title="Add to Cart"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      </div>
                    </div>

                  </div>

                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;