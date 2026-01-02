import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useToast } from '../context/ToastContext'; // ✅ Toast for Reviews only

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { showToast } = useToast(); 

  // Dummy Reviews Data
  const [reviews, setReviews] = useState([
    { id: 1, user: "Ram Kumar", rating: 5, comment: "Semma product! Worth for money. 🔥" },
    { id: 2, user: "Priya S", rating: 4, comment: "Good quality, but delivery took 2 days extra." },
    { id: 3, user: "Arun", rating: 5, comment: "Perfect fit. Highly recommended! ⭐" }
  ]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios.get(`https://future-fs-02-pi-bice.vercel.app/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview) return;
    
    const fakeReview = {
      id: reviews.length + 1,
      user: "You (Just Now)",
      rating: 5,
      comment: newReview
    };

    setReviews([...reviews, fakeReview]); 
    setNewReview(""); 
    showToast("Review Submitted! 📝", 'success');
  };

  if (!product) return <div className="text-center mt-40 text-white text-xl animate-pulse">Loading Product... ⏳</div>;

  return (
    <div className="container mx-auto p-6 mt-20">
      
      {/* Back Button */}
      <Link to="/" className="text-gray-400 hover:text-blue-400 mb-6 inline-flex items-center gap-2 transition">
        <span>←</span> Back to Shop
      </Link>
      
      {/* --- Product Info Section (Dark Card) --- */}
      <div className="flex flex-col md:flex-row bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-700 mb-10">
        
        {/* Image Side */}
        <div className="md:w-1/2 bg-gray-700/50 flex justify-center items-center p-10 relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-96 object-contain drop-shadow-2xl hover:scale-110 transition duration-500" 
          />
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Best Seller
          </span>
        </div>

        {/* Details Side */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-sm text-blue-400 font-bold uppercase tracking-widest mb-2">{product.category}</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">{product.name}</h1>
          
          <p className="text-gray-300 mb-8 leading-relaxed text-lg font-light">
            Experience premium quality with our exclusive {product.category} collection. 
            Designed for durability and style. Limited stock available.
          </p>
          
          <div className="flex items-center mb-10">
            <span className="text-4xl font-bold text-white mr-4">₹{product.price}</span>
            <span className="text-lg text-gray-500 line-through mr-4">₹{product.price * 1.2}</span>
            <span className="text-sm text-green-400 font-bold bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">In Stock</span>
          </div>

          {/* Action Button (Add to Cart ONLY) */}
          <div className="mt-2">
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-600/30 transform active:scale-95 flex justify-center items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* --- Customer Reviews Section (Dark Mode) --- */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-4">Customer Reviews 💬</h3>

        {/* Reviews List */}
        <div className="space-y-4 mb-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-700/50 p-5 rounded-xl border border-gray-600/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {review.user.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-200">{review.user}</span>
                </div>
                <span className="text-yellow-400 text-sm">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <p className="text-gray-400 text-sm ml-10">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Write a Review */}
        <form onSubmit={handleReviewSubmit} className="mt-8">
          <label className="block text-gray-300 font-medium mb-3">Write a Review</label>
          <div className="flex gap-3">
            <input 
              type="text" 
              className="w-full p-4 bg-gray-900 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-500" 
              placeholder="Share your thoughts..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
            />
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition shadow-lg">
              Submit
            </button>
          </div>
        </form>

      </div>

    </div>
  );
};

export default ProductDetails;