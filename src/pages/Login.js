import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
    const { setAuth } = useAuth();


    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    useEffect(() => {
        if (success) {
            window.location.href = '/'

        }
        return () => {

        }

    }, [success])

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let data = {
                username: user,
                passwd: pwd
            }
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const username = response?.data?.username;
            const gmail = response?.data?.gmail;
            setAuth({ username, gmail, accessToken });
            setUser("");
            setPwd("");
            localStorage.setItem("persist", "true")
            // window.location.href = '/'

            navigate(from, { replace: true });
            // setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username , Password or gmail");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <>

            <section className="login">

                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <h1>Sign In</h1>
                <form className="loginform" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?
                    <br />
                    <span className="line">
                        <Link style={{color:"white"}} to="/register">Sign Up</Link>
                    </span>
                </p>
            </section>
        </>
    );
};

export default Login;
