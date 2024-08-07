import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [clientId, setClientId] = useState(null);
  const [client, setClient] = useState({});
  const [bookings, setBookings] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (clientId) {
      // Fetch client details including role when clientId is set
      const fetchClientDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8081/api/v1/clients/${clientId}`);
          const data = await response.json();
          setClient(data);
          setRole(data.role);
        } catch (error) {
          console.error("Error fetching client details:", error);
        }
      };

      fetchClientDetails();
    }
  }, [clientId]);

  const logout = () => {
    setClientId(null);
    setClient({});
    setBookings([]);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ clientId, setClientId, client, setClient, bookings, setBookings, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
