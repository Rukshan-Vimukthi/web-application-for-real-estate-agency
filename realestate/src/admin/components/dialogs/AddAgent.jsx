import { XSquareFill } from "react-bootstrap-icons";
import { CustomDialog } from "../../../components/custom-components/components";
import api from "../../../api/api";
import { useState } from "react";

export default function AddAgent(props){
    const [data, setData] = useState(props.data);

    return (
        <CustomDialog visible={props.visible}>
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-5">
                    <div className="row">
                        <div className="col-11 ps-0 text-white fs-1 fw-bolder d-flex align-items-center justify-content-start">
                            Register Agent
                        </div>
                        <div className="col-1">
                            <div className="row align-items-center justify-content-end">
                                <XSquareFill className="fs-4" style={{color: "#FF0000"}} onClick={() => {
                                    props.setVisibility(false);
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 pt-3">
                            <div className="row pt-2">
                                <label className="form-label ps-0 text-white" htmlFor="first-name">First Name</label>
                                <input type="text" id="first-name" className="form-control"/>
                            </div>
                            <div className="row pt-2">
                                <label className="form-label ps-0 text-white" htmlFor="last-name">Last Name</label>
                                <input type="text" id="last-name" className="form-control"/>
                            </div>
                            <div className="row pt-2">
                                <label className="form-label ps-0 text-white" htmlFor="email">Email</label>
                                <input type="email" id="email" className="form-control"/>
                            </div>
                            <div className="row pt-2">
                                <label className="form-label ps-0 text-white" htmlFor="password">Password</label>
                                <input type="password" id="password" className="form-control"/>
                            </div>
                            <div className="row pt-2">
                                <label className="form-label ps-0 text-white" htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <button className="btn btn-primary" onClick={() => {
                            const data = {
                                firstName: document.getElementById("first-name").value,
                                lastName: document.getElementById("last-name").value,
                                email: document.getElementById("email").value,
                                password: document.getElementById("password").value,
                                confirmationPassword: document.getElementById("confirm-password").value,
                            }
                            api.post("api/admin/agents/register", data).then(response => {
                                if (response.status === 200){
                                    const data = response.data;
                                    if (data.status == "ok"){
                                        props.setVisibility(false);
                                    }
                                }
                            });
                        }}>Register</button>
                    </div>
                </div>
            </div>
        </CustomDialog>
    );
}