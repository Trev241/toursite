import React, { useState, useContext } from "react";
import "font-awesome/css/font-awesome.min.css"; // Importing FontAwesome CSS
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onSwitchToSignUp, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { setClientId , setClient } = useContext(AuthContext); // setting the client id

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const url = "http://localhost:8081/api/v1/clients/signin";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);
      const clientId = data.id;
      const role = data.role; // Get the role from the response

      setClientId(clientId);
      onLoginSuccess(data.email); // Pass the email to the parent component
      setClient(data)
      onClose(); // Close the modal after successful login

      if (role === "admin") {
        navigate("/admin-profile"); // Redirect to AdminProfile page
      } else {
        navigate("/profile"); // Redirect to Profile page
      }
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
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="mb-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 ease-in-out"
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
            LOGIN
          </button>
          <div className="mt-4 text-center">
            <span className="text-gray-700">Not a member? </span>
            <a
              href="#"
              className="text-blue-500 hover:underline"
              onClick={onSwitchToSignUp}
            >
              Sign up
            </a>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="text-center" onClick={() => setIsAdmin(false)}>
              <i
                className="fa fa-user text-gray-700 text-2xl cursor-pointer hover:text-blue-500 transition-colors duration-300"
                title="User Login"
              ></i>
              <p className="text-gray-700 mt-2">User</p>
            </div>
            <div className="text-center" onClick={() => setIsAdmin(true)}>
              <i
                className="fa fa-user-shield text-gray-700 text-2xl cursor-pointer hover:text-blue-500 transition-colors duration-300"
                title="Admin Login"
              ></i>
              <p className="text-gray-700 mt-2">Admin</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
