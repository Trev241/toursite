import { Children, createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [clientId,setClientId] = useState();
    return (
      <AuthContext.Provider value={{clientId,setClientId}}>
        {
          children
        }
      </AuthContext.Provider>
    )
    
}

