import { useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthContext";
import useAuth from "./useAuth";
import jwtDecode from "jwt-decode";
const BASE_URL = `/auth/token`
const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const response = await axios.get('/auth/token', {
        withCredentials: true,
      });

      const decoded = jwtDecode(response.data.accessToken)
      setAuth(
        { username: decoded.userInfo.user, accessToken: response.data.accessToken }
      );
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("persist")
      window.location.href = '/'
    }


  };
  return refresh;
};

export default useRefreshToken;
