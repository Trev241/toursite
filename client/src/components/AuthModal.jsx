import React, { useState } from 'react';
import Login from './Login';
import SignUp from './Signup';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return isLogin ? (
    <Login onClose={onClose} onSwitchToSignUp={() => setIsLogin(false)} />
  ) : (
    <SignUp onClose={onClose} onSwitchToLogin={() => setIsLogin(true)} />
  );
};

export default AuthModal;
