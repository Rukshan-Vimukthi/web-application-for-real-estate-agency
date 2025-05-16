import { useState, useEffect } from "react"
import api from "../api/api";
import { ACCESS, REFRESH } from "../constants/constants";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";


export function AuthenticateAdmin(username, email){
    const authentication = async () => {
         
    };
}

export default function RequestHandler({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(null);


    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH);
        try{
            const response = await api.post("/api/token/refresh", {refresh: refreshToken});
            if (response.status == 200){
                localStorage.setItem(ACCESS, response.data.access);
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }
        }catch(error){
            console.error(error);
            setIsAuthenticated(false);
        }
    }

    const auth = async () => {
        const accessToken = localStorage.getItem(ACCESS);
        if(accessToken){
            const decodedData = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000;
            if (decodedData.exp < currentTime){
                refreshToken();
            }
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }
    }

    useEffect(() => {auth().catch(() => {setIsAuthenticated(false)})});


    if (isAuthenticated == null){
        return <Loading/>;
    }else{
        return isAuthenticated ? children : <Navigate to="/login"/>;
    }

}