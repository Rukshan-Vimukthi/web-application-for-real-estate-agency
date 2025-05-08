import { useState } from "react";
import api from "../../api/api";
import { Navigate, useNavigate } from "react-router-dom";
import { ACCESS, REFRESH } from "../../constants/constants";
// import LoginBackgroundImage from "../../assets/Images/Login/login-background.png";
import LoginBackgroundImage from "../../assets/Images/Houses/ChatGPT Image Apr 13, 2025, 11_46_48 PM.png";
import { Col, Row } from "react-bootstrap";


export default function Login(props){
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        const response = await api.post("/api/v1/user/login", {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        });

        console.log(response);
        
        if (response.status === 200){
            // alert(JSON.stringify(response.data));
            if (response.data.status == 'success'){
                let data = response.data;
                const accessToken = data[ACCESS];
                const refreshToken = data[REFRESH]

                console.log(accessToken);
                console.log(refreshToken);
                
                localStorage.setItem(ACCESS, accessToken);
                localStorage.setItem(REFRESH, refreshToken);
                props.login(true);
                navigate('/profile');
                // alert("")
            }
        }
    }
        return(
            <div className="row pt-5" style={{backgroundImage: `url('${LoginBackgroundImage}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPositionY: "50px"}}>
                <div className="col-6 d-flex justify-content-center align-items-start mt-5 pt-5">
                    <Row className="justify-content-center mt-5">
                        <Col sm={8} className="pt-3 px-3 pb-4 rounded-2" style={{backgroundColor: "#000A"}}>
                            <Row className="text-white justify-content-center fs-1 fw-bolder">Welcome Back!</Row>
                            <Row className="text-white text-center pt-3">
                                Log in to access your personalized dashboard, explore exclusive property listings, 
                                and manage your real estate journey with ease.
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className="col-6">
                    <div className="row vh-100 d-flex justify-content-center align-items-start pt-5">
                        <div className="col-8 d-flex flex-column gap-2 pt-5">
                            <div className="row">
                                <label className="form-label ps-0">E-mail</label>
                                <input className="form-control" type="email" id="email"/>
                            </div>
                            <div className="row">
                                <label className="form-label ps-0">Password</label>
                                <input className="form-control text-black" type="password" id="password"/>
                            </div>
                            <Row>
                                <Col sm={6} className="d-flex flex-row gap-2">
                                    <input type="checkbox"className=" form-check-input"/>
                                    Remember me
                                </Col>
                                <Col sm={6} className=" d-flex justify-content-end">
                                    <a href="#">Forgot password</a>
                                </Col>
                            </Row>
                            <div className="row">
                                <button className="btn btn-primary" onClick={login}>Login</button>
                            </div>
                            <Row>
                                <span>Don't have an account? <a href="/Register">Create an account</a></span>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
}