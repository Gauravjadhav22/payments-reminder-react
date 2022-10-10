import React, { useDebugValue, useContext } from "react";
import AuthContext from "../context/AuthContext";


const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);

}



export default useAuth;