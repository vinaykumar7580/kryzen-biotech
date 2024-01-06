import React, { useState } from "react";


export const AuthContext=React.createContext();

function AuthContextProvider({children}){
    const [token, setToken]=useState(localStorage.getItem("token") || null)

    let value={token}

    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
        
    )
}

export default AuthContextProvider