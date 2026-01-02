import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ 1. Safe User Loading (Crash Aagathu)
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      
      // "undefined" string-a irunthaalo, illana null-a irunthaalo... NULL nu set pannidu.
      if (!savedUser || savedUser === "undefined") {
        return null; 
      }
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Local Storage Error Cleaned 🧹", error);
      localStorage.removeItem('user'); // Corrupt data-va clean pannidum
      return null;
    }
  });

  // ✅ 2. Safe Token Loading
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return (savedToken && savedToken !== "undefined") ? savedToken : '';
  });

  // Login Function
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData)); 
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};