import React, { useState } from 'react';

const SignUp = ({ onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Submitting sign-up form");
    try {
      const response = await fetch("http://localhost:8081/api/v1/clients/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      const data = await response.json();
      console.log(data);
      setSuccessMessage('Registration successful!'); 
      alert("succesful")
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
    className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    onClick={handleOverlayClick}
  >
    <div
      className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
      {successMessage && (
        <div className="mb-4 text-center text-green-500">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <i className="fas fa-user"></i>
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full pl-10 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <i className="fas fa-envelope"></i>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-10 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <i className="fas fa-lock"></i>
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-10 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-black rounded-md hover:bg-blue-600 transition-colors duration-300"
          style={{
            backgroundColor: "#3490dc", // Blue color
            color: "white",
            fontWeight: "bold",
            fontSize: "1.25rem",
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.2)"
          }}
        >
          SIGN UP
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-700">Already a member? </span>
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={onSwitchToLogin}
          >
            Login
          </a>
        </div>
      </form>
    </div>
  </div>
);
};



export default SignUp;
