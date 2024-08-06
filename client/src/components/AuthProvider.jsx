import { Children, createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [clientId,setClientId] = useState();
    const [client, setClient] = useState({});
    return (
      <AuthContext.Provider value={{clientId,setClientId,client,setClient}}>
        {
          children
        }
      </AuthContext.Provider>
      
    )
    
}

