import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  // Function to trigger the toast
  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* ✨ TOAST UI COMPONENT ✨ */}
      <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out ${toast.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="flex items-center gap-3 bg-gray-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-gray-700 min-w-[300px] justify-center">
          
          {/* Icons based on Type */}
          {toast.type === 'success' ? (
            <span className="text-green-400 text-xl">✅</span>
          ) : (
            <span className="text-red-400 text-xl">❌</span>
          )}

          <span className="font-medium tracking-wide text-sm">{toast.message}</span>
        </div>
      </div>

    </ToastContext.Provider>
  );
};