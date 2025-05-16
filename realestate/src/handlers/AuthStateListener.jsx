import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AuthStateListener(props){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const accessToken = localStorage.getItem("A_ACCESS_TOKEN");
            const userAccessToken = localStorage.getItem("access");

            const currentTime = Date.now() / 1000;

            if (accessToken){
                const refreshToken = localStorage.getItem("A_REFRESH_TOKEN");

                const decodedToken = jwtDecode(accessToken);

                setIsAuthenticated(decodedToken.exp < currentTime);

                if (decodedToken.exp < currentTime){
                    navigate("/realtor/login");
                }else{
                    // setIsAuthenticated(true);
                }
            }else if(userAccessToken){
                const decodedData = jwtDecode(userAccessToken);

                setIsAuthenticated(decodedData.exp < currentTime);

                if (decodedData.exp < currentTime){
                    // setIsAuthenticated(false);
                }else{
                    // setIsAuthenticated(true);
                }
            }else{
                navigate("/");
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [])
    
    return (props.children);
}