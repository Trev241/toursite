import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [clientId, setClientId] = useState();
  const [client, setClient] = useState({});
  const [bookings, setBookings] = useState([]);

  return (
    <AuthContext.Provider value={{ clientId, setClientId, client, setClient, bookings, setBookings }}>
      {children}
    </AuthContext.Provider>
  );
};
