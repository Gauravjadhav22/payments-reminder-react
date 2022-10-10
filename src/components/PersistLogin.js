import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { IsLoading } from "./IsLoading";
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist, setAuth, setDecoded } = useAuth();



    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
                console.log(auth);

            }
            catch (err) {
                console.error(err);

            }
            finally {
                isMounted && setIsLoading(false);
            }
        }




        !auth?.accessToken && persist ? verifyRefreshToken()
            :
            setIsLoading(false);

        return () => isMounted = false;
    }, [])



    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <IsLoading />
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin