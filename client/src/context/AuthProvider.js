/*
    Context shares data to all components wrapped in it. Here use authentication state is shared among all components

*/

import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;