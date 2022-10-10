import { useContext } from "react";
import { useLocation, Navigate, Outlet, Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
 
    const location = useLocation();

    return (
        auth?.accessToken ? <Outlet />

            : <div style={{ display: "flex", justifyContent: "center" }}><NavLink to='/' style={{ backgroundColor: "navy", fontSize: "xx-large", color: "white", padding: "5px", borderRadius: "5px", textAlign: "center" }}>go to login</NavLink></div>);
}

export default RequireAuth;