import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Login from "../../components/bininstructions-components/Forms/Login";
import "../css/admin-style.css";
import { ACCESS, REFRESH } from "../../constants/constants";
import { useState } from "react";

import {Row} from "react-bootstrap";



export default function AdminLogin(){
    localStorage.clear();

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [authError, setAuthError] = useState("");

    const navigate = useNavigate();
    const login = async() => {
        const userName = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        setIsLoggingIn(true);

        const response = await api.post("api/v1/admin/login", {"username": userName, "password": password});
        if(response.status === 200){
            let data = response.data;
            console.log(data);
            if (data.status == "success"){
                const tokenResponse = await api.post("api/token/", {"username": userName, "password": password});
                const accessToken = tokenResponse.data.access;
                const refreshToken = tokenResponse.data.refresh;

                localStorage.setItem(ACCESS, accessToken);
                localStorage.setItem(REFRESH, refreshToken);

                navigate("/admin/");
            }else{
                setIsLoggingIn(false);
                setAuthError("Something went wrong. Try again in 1 minute.");
            }
        }else{
            setIsLoggingIn(false);
            setAuthError("Something went wrong. Try again in 1 minute.");
        }
    };

    return (        
        <div className="row bg-black d-flex justify-content-center align-items-center vh-100 vw-100">
            <div className="col-3">
                <div className="row fs-1 text-white">
                    Admin Login
                </div>
                {authError ? <Row className="text-danger">
                    {authError}
                </Row> : <></>}
                <div className="row pt-3">
                    <label className="form-label ps-0 text-white">User Name</label>
                    <input id="username" className="form-control"/>
                </div>
                <div className="row pt-3">
                    <label className="form-label ps-0 text-white">Password</label>
                    <input type="password" id="password" className="form-control"/>
                </div>
                <div className="row pt-2 justify-content-center">
                    <button className="btn btn-primary" onClick={() => {login()}}>{isLoggingIn ? "Logging in" : "Log in" }</button>
                </div>
            </div>
            {/* <Login title="Admin Login" label1="User Name" label1Type="text" login={login}/> */}
        </div>
    );
}