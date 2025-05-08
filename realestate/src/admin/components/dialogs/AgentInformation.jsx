import { Col, Row } from "react-bootstrap";
import api from "../../../api/api";
import { CustomDialog } from "../../../components/custom-components/components";
import { useRef, useState } from "react";

export default function AgentInformation(props){
    const profileImageSelector = useRef();
    const [selectedAgentProfileImage, setSelectedAgentProfileImage] = useState();
    const [agentProfileImagePreview, setAgentProfileImagePreview] = useState();

    const progressBar = useRef();
    
    return (
        <CustomDialog visible={props.visible} setVisibility={props.setVisibility}>
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-4 p-3 rounded-3 px-4" style={{border: "solid", borderColor: "#0055FF55"}}>
                    <div className=" rounded-2" style={{width: "0%", height: "5px", background: "linear-gradient(45deg, #0000FF, #8800FF)"}} ref={progressBar}></div>
                    <div className="row fs-2 text-white">
                        Agent Information
                    </div>
                    <div className="row pt-3">
                        <div className="col-12">
                            <Row>
                                <Col sm={12} md={4} className="d-flex align-items-center">
                                    <div style={
                                        {
                                            width: "120px", 
                                            height: "120px", 
                                            backgroundColor: "#888", 
                                            borderRadius: "60px",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundImage: `url('${props.data.agentProfileImage ? props.data.agentProfileImage : agentProfileImagePreview}')`
                                        }
                                    } onClick={() => {
                                        profileImageSelector.current.click();
                                    }}>

                                    </div>
                                    <input type="file" hidden={true} ref={profileImageSelector} onChange={() => {
                                        setSelectedAgentProfileImage(profileImageSelector.current.files[0]);
                                        const imageURL = URL.createObjectURL(selectedAgentProfileImage);
                                        setAgentProfileImagePreview(imageURL);
                                    }}/>
                                </Col>
                                <Col sm={12} md={8} className="d-flex align-items-center">
                                    <Row>
                                        <label className="form-label text-white-50 ps-0 fs-6 mb-0">Username</label>
                                        <input className="form-control outline-primary border-primary text-white-50" defaultValue={props.data.agentUserName} id="agent-username"/>
                                    </Row>
                                    {/* {JSON.stringify(props.data)} */}
                                </Col>
                            </Row>
                            <div className="row pt-3">
                                <Col xs={6}>
                                    <label className="form-label text-white-50 ps-0 fs-6 mb-0 pt-1">First Name</label>
                                    <input className="form-control outline-primary border-primary text-white-50" defaultValue={props.data.agentFirstName} id="agent-first-name"/>
                                </Col>
                                <Col sm={6}>
                                    <label className="form-label text-white-50 ps-0 mb-0 pt-1">Last Name</label>
                                    <input className="form-control outline-primary border-primary text-white-50" defaultValue={props.data.agentLastName} id="agent-last-name"/>
                                </Col>
                            </div>

                            <div className="row pt-3">
                                <Col xs={12}>
                                    <label className="form-label text-white-50 ps-0 mb-0 pt-1">Email</label>
                                    <input className="form-control outline-primary border-primary text-white-50" defaultValue={props.data.agentEmail} id="agent-email"/>
                                </Col>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <Col xs={12} className="d-flex align-items-center justify-content-end gap-4">
                            {props.isUpdatable ? 
                            <>
                            <button className="btn w-auto" style={{backgroundColor: "#00FF00", color: "#005500"}} onClick={() => {
                                const userName = document.getElementById("agent-username");
                                const firstName = document.getElementById("agent-first-name");
                                const lastName = document.getElementById("agent-last-name");
                                const email = document.getElementById("agent-email");

                                const data = {
                                    id: props.data.agentID,
                                    agentUserName: userName.value,
                                    agentFirstName: firstName.value,
                                    agentLastName: lastName.value,
                                    agentEmail: email.value,
                                    profileImage: selectedAgentProfileImage ? selectedAgentProfileImage : null
                                }

                                api.post("api/admin/agent/update", data, {headers: {"Content-Type": "multipart/form-data"}, onUploadProgress: (event) => {
                                    progressBar.current.style.width = (event.progress * 100) + "%"
                                }}).then(response => {
                                    if (response.status === 200){
                                        const data = response.data;
                                        // alert(data.status);
                                        if (data.status == "ok"){
                                            props.setVisibility(false);
                                        }
                                    }
                                });

                            }}>Update</button>
                            </> : <></>}
                            <button className="btn w-auto" style={{backgroundColor: "#FF0000", color: "#FFFFFF"}} onClick={() => {
                                props.setVisibility(false);
                            }}>close</button>
                        </Col>
                    </div>
                </div>
            </div>
        </CustomDialog>
    );
}