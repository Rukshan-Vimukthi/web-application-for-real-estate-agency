import { useState, useEffect } from 'react';
import api from '../../api/api';
import Login from '../../components/bininstructions-components/Forms/Login';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';



export default function LoginPage(){
    const stored_access_token = localStorage.getItem("A_ACCESS_TOKEN");
    const stored_refresh_token = localStorage.getItem("A_REFRESH_TOKEN");

    const navigate = useNavigate();

    const authenticate = async() => {
        let userName = document.getElementById("username");
        let password = document.getElementById("password");

        const agentUserName = userName.value;
        const agentPassword = password.value;

        const response = await api.post("/api/agent/authenticate", {username: agentUserName, password: agentPassword});

        if (response.status === 200){
            const data = response.data.data;
            console.log(data.status);
            if (data.status == "ok"){
                if (stored_access_token == null || stored_access_token == undefined || stored_refresh_token == null || stored_refresh_token == undefined){
                    const token_response = await api.post("api/token/", {username: agentUserName, password: agentPassword});
                    console.log(token_response);
                    if (token_response.status === 200){
                        const access_token = token_response.data.access;
                        const refresh_token = token_response.data.refresh;

                        console.log(access_token);
                        console.log(refresh_token);

                        localStorage.setItem("A_ACCESS_TOKEN", access_token);
                        localStorage.setItem("A_REFRESH_TOKEN", refresh_token);

                        navigate("/realtor/chat-room");
                    }

                }else{
                    const currentDate = Date.now();
                    const decodedToken = jwtDecode(stored_access_token);
                    const expDate = decodedToken.exp;

                    if (expDate < currentDate){

                        const refresh_token_response = await api.post("/api/token/refresh/", {refresh: stored_refresh_token});

                        if(refresh_token_response.status === 200){
                            const new_access_token = refresh_token_response.data.access;
                            console.log(new_access_token);
                            localStorage.setItem("A_ACCESS_TOKEN", new_access_token);
                            navigate("/realtor/chat-room");
                        }
                    }else{
                        navigate("/realtor/chat-room");
                    }
                }
            }
        }
    }


    return (
        <div className="row d-flex justify-content-center align-items-center vh-100 bg-black">
            <Login name="Agent Login" login={authenticate}/>
        </div>
    );
}