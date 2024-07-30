import React, { useState } from 'react';
import Login from './Login'; // Ensure this path is correct
import SignUp from './Signup'; // Ensure this path is correct

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full" onClick={e => e.stopPropagation()}>
        {isLogin ? (
          <Login 
            onClose={onClose} 
            onSwitchToSignUp={() => setIsLogin(false)} 
            onLoginSuccess={onLoginSuccess} // Pass onLoginSuccess to Login
          />
        ) : (
          <SignUp 
            onClose={onClose} 
            onSwitchToLogin={() => setIsLogin(true)} 
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
