import { useState, useEffect, useRef } from 'react';
import api from '../../api/api';
import Login from '../../components/bininstructions-components/Forms/Login';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';



export default function LoginPage(props){
    const stored_access_token = localStorage.getItem("A_ACCESS_TOKEN");
    const stored_refresh_token = localStorage.getItem("A_REFRESH_TOKEN");

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const authenticate = async(setAuthenticationState) => {
        let userName = document.getElementById("username");
        let password = document.getElementById("password");

        const agentUserName = userName.value;
        const agentPassword = password.value;

        setAuthenticationState(true);

        const response = await api.post("/api/v1/agent/authenticate", {username: agentUserName, password: agentPassword});
        if (response.status === 200){
            const data = response.data;

            console.log(data);

            if (data.status == "ok"){
                const access_token = data.access;
                const refresh_token = data.refresh;

                localStorage.clear();

                localStorage.setItem("A_ACCESS_TOKEN", access_token);
                localStorage.setItem("A_REFRESH_TOKEN", refresh_token);
                props.login(true);

                navigate("/realtor");
                setAuthenticationState(false);
            }else{
                props.login(false);
                setErrorMessage()
                setAuthenticationState(false);
            }
        }
    }

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div className="row d-flex justify-content-center align-items-center vh-100 bg-black">
            <Login name="Agent Login" login={authenticate}/>
        </div>
    );
}