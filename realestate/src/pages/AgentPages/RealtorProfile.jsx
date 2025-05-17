import { Card, CardBody, CardHeader, Col, FormCheck, Row, Tab, Tabs } from "react-bootstrap";
import { TabView, TabContent, TabItem, TabItemContainer, TabContentContainer } from "../../components/custom-components/components";

import "./css/style.css";
import { CheckCircleFill, ClockFill, GraphUp, GraphUpArrow, KeyFill, PencilFill, StarFill, Upload } from "react-bootstrap-icons";
import { FaCheckCircle, FaHome, FaKey, FaRegCalendarAlt } from "react-icons/fa";
import { GiHouseKeys, GiPencil } from "react-icons/gi";
import Ratings from "./components/Ratings";
import { useEffect, useRef, useState } from "react";
import ChatRoomPage from "./ChatRoomPage";
import api from "../../api/api";
import Listings from "./TabContents/Listings";

import "../../components/css/style.css";
import HouseVisitRequestDialog from "../../components/HouseVisitRequestDialog";

export default function RealtorProfile(){
    const [agentInformation, setAgentInformation] = useState({})  
    const [isChecked, setIsChecked] = useState(false);
    const toggleEmailNotification = () => {
        setIsChecked(!isChecked);
    };


    const getAgentInformation = async () => {
        const response = await api.get("/api/v1/agent/agent-information");
        if (response.status === 200){
            const data = response.data;
            if (data.status == "ok"){
                setAgentInformation(data.data);
                // alert(JSON.stringify(data.data));
            }
        }
    }


    const [updateBasicInformation, setUpdateBasicInformation] = useState(false);
    const [updateBio, setUpdateBio] = useState(false);

    const [updateImage, setUpdateImage] = useState(false);
    const agentProfileImageRef = useRef();

    const uploadImage = async() => {
        const data = {
            agentProfileImage: agentProfileImageRef.current.files[0]
        }

        const response = await api.post("/api/v1/agent/data/update", data, {headers: {"Content-Type": "multipart/form-data"}});
        if(response.status === 200){
            const data = response.data;
            if (data.status == "ok"){
                setUpdateImage(false);
                alert("Information Updated successfully!");
            }
        }
    }



    const saveBasicInformation = async () => {
        const username = document.getElementById("username");
        const firstName = document.getElementById("firstName")
        const lastName = document.getElementById("lastName");
        const phoneNumber = document.getElementById("phoneNumber");
        const title = document.getElementById("title");

        const data = {
            userName: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            title: title.value
        }

        const response = await api.post("/api/v1/agent/data/update", data);
        if(response.status === 200){
            const data = response.data;
            if (data.status == "ok"){
                setUpdateBasicInformation(false);
                alert("Information Updated successfully!");
            }
        }
    };


    const saveBio = async() => {
        const bio = document.getElementById("bio");

        const data = {
            bio: bio.innerText,
        }

        const response = await api.post("/api/v1/agent/data/update", data);
        if(response.status === 200){
            const data = response.data;
            if (data.status == "ok"){
                setUpdateBio(false);
                alert("Information Updated successfully!");
            }
        }
    }

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showSelectedRequestViewDialog, setShowSelectedRequestViewDialog] = useState(false);

    const showSelectedRequestViewDialogRef = useRef(showSelectedRequestViewDialog);
    const setShowSelectedRequestViewDialogRef = (data) => {
        showSelectedRequestViewDialogRef.current = data;
        setShowSelectedRequestViewDialog(data);
    }


    useEffect(() => {
        const interval = setInterval(() => {
            getAgentInformation();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Row className="">
            <TabView tabAlignment={"left"}>
                <TabItemContainer>
                    <TabItem title="Dashboard" id="dashboard" active={true}/>
                    <TabItem title="Profile" id="profile"/>
                    <TabItem title="Appointments" id="appointments"/>
                    <TabItem title="Listings" id="listings"/>
                    <TabItem title="Chat" id="chat" />
                    <TabItem title="Settings" id="settings"/>
                </TabItemContainer>
                <TabContentContainer>
                    <TabContent for="dashboard" active={true}>
                        <Col xs={12} md={6} lg={7} xl={8} className="d-flex flex-column gap-3">
                            <HouseVisitRequestDialog 
                                title="House Visit Request" 
                                visible={showSelectedRequestViewDialogRef.current} 
                                setVisible={setShowSelectedRequestViewDialogRef} 
                                requestData={selectedRequest}/>

                            <Row className="gap-0 flex-wrap">
                                <Col xs={12} lg={6} xl={3} className="">
                                    <Card className="zoom-on-hover" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                        <CardHeader className="fs-5 fw-semibold">Listings</CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs={8} className="fw-semibold">Total</Col>
                                                <Col xs={4}>{agentInformation.totalListings}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={8} className="fw-semibold">Houses</Col>
                                                <Col xs={4}>{agentInformation.numberOfHouses}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={8} className="fw-semibold">Lands</Col>
                                                <Col xs={4}>{agentInformation.numberOfLands}</Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs={12} lg={6} xl={3}>
                                    <Card className="h-100 zoom-on-hover" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                        <CardHeader className="fs-5 fw-semibold">
                                            <Row>
                                                <Col xs={7}>Sold</Col>
                                                <Col xs={5} className="d-flex justify-content-end align-items-center"><FaCheckCircle size={28} /></Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody className="d-flex flex-column justify-content-center">
                                            <Row className="fs-3 justify-content-center align-items-center">
                                                {agentInformation.soldProperties}
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs={12} lg={6} xl={3} className="pt-2 pt-xl-0">
                                    <Card className="h-100 zoom-on-hover" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                        <CardHeader className="fs-5 fw-semibold">
                                            <Row>
                                                <Col xs={8}>Rented</Col>
                                                <Col xs={4} className="d-flex justify-content-end align-items-center">
                                                    <FaKey size={28} />
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody className="d-flex flex-column justify-content-center">
                                            <Row className="fs-3 justify-content-center align-items-center">
                                                {agentInformation.rentedProperties}
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs={12} lg={6} xl={3} className="pt-2 pt-xl-0">
                                    <Card className="h-100 zoom-on-hover" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                        <CardHeader className="fs-5 fw-semibold">
                                            <Row>
                                                <Col xs={8}>Available</Col>
                                                <Col xs={4} className="d-flex justify-content-end align-items-center"><FaHome size={32} /></Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody className="d-flex flex-column justify-content-center">
                                            <Row className="fs-3 justify-content-center align-items-center">
                                                {agentInformation.availableProperties}
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="flex-column-reverse flex-xl-row gap-3 gap-xl-0">
                                <Col xs={12} xl={6}>
                                    <Card className="zoom-on-hover" style={{boxShadow: "0px 0px 15px 1px #0004", height: "300px"}}>
                                        <CardHeader className="fs-5">
                                            <Row>
                                                <Col xs={8} md={7}>Performance Metrics</Col>
                                                <Col xs={4} md={2}><GraphUpArrow color="#000" size={24}/></Col>
                                            </Row>
                                            
                                        </CardHeader>
                                        <CardBody>

                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs={12} xl={6}>
                                    <Row className="gap-0">
                                        <Col xs={12} lg={6}>
                                            <Card className="h-100 zoom-on-hover" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                                <CardHeader className="fs-5 fw-semibold">
                                                    <Row>
                                                        <Col xs={8}>For Rent</Col>
                                                        <Col xs={4} className="d-flex justify-content-end align-items-center"><GiHouseKeys size={32} /></Col>
                                                    </Row>
                                                </CardHeader>
                                                <CardBody className="d-flex flex-column justify-content-center">
                                                    <Row className="fs-3 justify-content-center align-items-center">
                                                        {agentInformation.availableToRentProperties}
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xs={12} lg={6}>
                                            <Card className="h-100 zoom-on-hover" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                                <CardHeader className="fs-5 fw-semibold">
                                                    <Row>
                                                        <Col xs={8}>Reserved</Col>
                                                        <Col xs={4} className="d-flex justify-content-end align-items-center"><FaHome size={32} /></Col>
                                                    </Row>
                                                </CardHeader>
                                                <CardBody className="d-flex flex-column justify-content-center">
                                                    <Row className="fs-3 justify-content-center align-items-center">
                                                        {agentInformation.reservedProperties}
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} lg={6}>
                                    <Card className="h-100" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                        <CardHeader className="fs-4 fw-semibold">
                                            <Row>
                                                <Col xs={9}>Pending Requests</Col>
                                                <Col xs={3} className="d-flex justify-content-end align-items-center"><ClockFill size={28} /></Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody className="d-flex flex-column gap-2 text-black">
                                            {agentInformation?.propertyVisitRequests?.map((request) => {
                                                return(
                                                    <Row key={request.id} className="rounded-2 d-flex align-items-center py-1 event-card" style={{backgroundColor: "#0000FF20", height: "50px"}}>
                                                        <Col xs={8} className="fw-semibold">House Visit with {request.buyer.userName}</Col>
                                                        <Col xs={4} className="d-flex justify-content-end"><button className="btn btn-primary fw-bold" onClick={() => {
                                                            setSelectedRequest(request);
                                                            setShowSelectedRequestViewDialogRef(true);
                                                        }}>VIEW</button></Col>
                                                    </Row>
                                                );
                                            })}

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={6} lg={5} xl={4} className="d-flex flex-column gap-3">
                            <Row className="">
                                <Col xs={12} className="" style={{height: "300px"}}>
                                    <Card className="h-100" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                        <CardHeader className="fs-4 fw-semibold">
                                            <Row>
                                                <Col xs={9}>Upcoming Events</Col>
                                                <Col xs={3} className="d-flex justify-content-end align-items-center"><FaRegCalendarAlt size={28} /></Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody className="d-flex flex-column gap-2">
                                            <Row className="rounded-2 d-flex align-items-center py-1 event-card" style={{backgroundColor: "#0000FF20", height: "50px"}}>
                                                <Col xs={8} className="fw-semibold">House Visit with Charlie</Col>
                                                <Col xs={4} className="d-flex justify-content-end"><button className="btn btn-primary fw-bold">JOIN</button></Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} className="" style={{height: "300px"}}>
                                    <Card className="h-100" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                        <CardHeader className="fs-4 fw-semibold">
                                            <Row>
                                                <Col xs={9}>
                                                    Activity Timeline
                                                </Col>
                                                <Col xs={3} className="d-flex justify-content-end align-items-center">
                                                    <FaRegCalendarAlt size={28} />
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody className="d-flex flex-column gap-2">
                                            <Row className="rounded-2 d-flex align-items-center py-1 event-card" style={{backgroundColor: "#0000FF20", height: "50px"}}>
                                                <Col xs={8} className="fw-semibold">
                                                    New message received!
                                                </Col>
                                                <Col xs={4} className="d-flex justify-content-end">05:30 PM</Col>
                                            </Row>

                                            <Row className="rounded-2 d-flex align-items-center py-1 event-card" style={{backgroundColor: "#0000FF20", height: "50px"}}>
                                                <Col xs={8} className="fw-semibold">
                                                    Property #56 Updated
                                                </Col>
                                                <Col xs={4} className="d-flex justify-content-end">05:30 PM</Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>

                            </Row>

                        </Col>
                    </TabContent>

                    <TabContent for="profile">
                        <Col xs={12}>
                            <Row>
                                <Col xs={12} md={4} xl={2} className="">
                                    <Row className="gap-2">
                                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                                            <div style={
                                                {
                                                    width: "175px", 
                                                    height: "175px", 
                                                    backgroundColor: "#0003",
                                                    backgroundImage: `url(${agentInformation.profileImageURL})`,
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat"
                                                }
                                            }>
                                                
                                            </div>
                                        </Col>
                                        <Col xs={12} className="d-flex justify-content-center align-items-center gap-2">
                                            <button className="btn btn-primary w-auto d-flex align-items-center justify-content-center gap-2"
                                                onClick={() => {
                                                    agentProfileImageRef.current.click();
                                                }}>
                                                <PencilFill size={18}/>
                                                Change Image
                                            </button>
                                            {updateImage ? 
                                            <button 
                                                className="btn btn-success"
                                                onClick={uploadImage}
                                                ><Upload /></button> : <></> }
                                            <input type={"file"} ref={agentProfileImageRef} onChange={() => {
                                                    try{
                                                        const image = agentProfileImageRef.current.files[0];
                                                        const tempURL = URL.createObjectURL(image);
                                                        setUpdateImage(true);
                                                    }catch{
                                                        console.error("Image selection failed")
                                                    }
                                                }} hidden={true} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} md={8} xl={10}>
                                    <Row className="fs-3 fw-bolder">
                                        <Col xs={9}>
                                            {agentInformation.firstName} {agentInformation.lastName}
                                        </Col>
                                    </Row>
                                    <Row className="fs-4 fw-semibold">
                                        <Col xs={12}>
                                            {agentInformation.title}
                                            
                                        </Col>
                                    </Row>
                                    <Row className=" fs-6">
                                        <Col xs={12} contentEditable={updateBio} id={"bio"}>
                                            {agentInformation.bio}
                                        </Col>
                                        <Col xs={12} className="pt-2 d-flex gap-3">
                                            <button 
                                                className="btn btn-primary d-flex gap-2 align-items-center justify-content-center w-auto"
                                                onClick={() => {
                                                    setUpdateBio(true);
                                                }}
                                                >
                                                    <PencilFill size={18}/>
                                                    Edit Information
                                            </button>
                                            {updateBio ? 
                                            <>
                                            <button 
                                                className="btn btn-success w-auto" 
                                                onClick={saveBio}
                                            >
                                                    Save Changes
                                                </button>
                                            <button className="btn btn-danger" onClick={() => {
                                                setUpdateBio(false);
                                            }}>Discard Changes</button>
                                            </> : <></>}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="px-5 pt-5">
                                <Col xs={12} md={4} xl={5} className="rounded-3 mt-3" style={{boxShadow: "0px 0px 15px 1px #0004"}}>
                                    <Row className="h-100">
                                        <Card className="p-3 h-100 gap-2">
                                            <Row>
                                                <Col xs={12}>
                                                    <label>User Name</label>
                                                    <input 
                                                        type="text" 
                                                        id="username"
                                                        className="form-control text-black" 
                                                        defaultValue={agentInformation.username} 
                                                        readOnly={!updateBasicInformation}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={6}>
                                                    <label>First Name</label>
                                                    <input 
                                                        type="text" 
                                                        id="firstName"
                                                        className="form-control text-black" 
                                                        defaultValue={agentInformation.firstName} 
                                                        readOnly={!updateBasicInformation}
                                                    />
                                                </Col>

                                                <Col xs={6}>
                                                    <label>Last Name</label>
                                                    <input 
                                                        type="text" 
                                                        id="lastName"
                                                        className="form-control text-black" 
                                                        defaultValue={agentInformation.lastName} 
                                                        readOnly={!updateBasicInformation}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={12}>
                                                    <label>Phone Number</label>
                                                    <input 
                                                        type="text" 
                                                        id="phoneNumber"
                                                        className="form-control text-black" 
                                                        defaultValue={agentInformation.phone} 
                                                        readOnly={!updateBasicInformation}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={12}>
                                                    <label>Title</label>
                                                    <input 
                                                        type="text" 
                                                        id="title" 
                                                        defaultValue={agentInformation.title}
                                                        readOnly={!updateBasicInformation}
                                                        className="form-control text-black" />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={3} className="pt-3">
                                                    <button className={"btn btn-primary "} disabled={updateBasicInformation} onClick={() => {
                                                        setUpdateBasicInformation(true);
                                                    }}>UPDATE</button>
                                                </Col>
                                                <Col xs={9} className="pt-3 d-flex gap-2 justify-content-end">
                                                    {updateBasicInformation ? 
                                                        <>
                                                            <button className="btn btn-primary" onClick={saveBasicInformation}>SAVE</button>
                                                            <button className="btn btn-danger" onClick={() => {
                                                                setUpdateBasicInformation(false);
                                                            }}>Discard Changes</button>
                                                        </> 
                                                        : 
                                                        <></> 
                                                    }
                                                </Col>
                                            </Row>

                                        </Card>
                                    </Row>
                                </Col>
                                <Col xs={12} md={4} className="px-5">
                                    <Row className="fs-3 fw-bold">
                                        Ratings
                                    </Row>
                                    <Row className="fs-4 fw-semibold">
                                        <Col xs={12}>
                                            <Ratings rating={5.0} count={550} />
                                            <Ratings rating={4.5} count={50} />
                                            <Ratings rating={4.0} count={50} />
                                            <Ratings rating={3.5} count={50} />
                                            <Ratings rating={3.0} count={50} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </TabContent>

                    <TabContent for="appointments">
                        <Col xs={12}>
                            
                        </Col>
                    </TabContent>

                    <TabContent for="listings">
                        <Listings />
                    </TabContent>

                    <TabContent for="chat">
                        <ChatRoomPage />
                    </TabContent>

                    <TabContent for="settings">
                        <Col xs={12}>
                            <Row className="pt-3 gap-4">
                                <Col xs={12} md={5} className={"rounded-2 pb-3 pt-1 px-4"} style={{backgroundColor: "#FF000022"}}>
                                    <Row className="fs-4 fw-semibold">
                                        Account
                                    </Row>
                                    <Row>
                                        <Col xs={12} className=" bg-warning rounded-2 p-3">
                                            <strong>Warning!</strong>
                                            <p>
                                                This action causes your account to be deleted permanently and unable to recover back. You will lost all the 
                                                properties you have listed and associated media files with it and all the chat data of yours with all the clients
                                                you have chatted with will also be deleted permanently. Only click the button below If you are sure about what you are 
                                                going to do and the things that are going to happen to your account as stated above.
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row className="pt-3">
                                        <button className="btn btn-danger w-auto">Delete account</button>
                                    </Row>
                                </Col>
                                <Col xs={12} md={5}>
                                    <Row className="fs-4">
                                        Notification Settings
                                    </Row>
                                    <Row className="pt-3">
                                        <Col xs={3} className="d-flex align-items-center">Email Notification</Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <FormCheck type="switch" size={28} className="custom-switch" id="email-notification-toggle" checked={isChecked} onChange={(event) => {
                                                toggleEmailNotification();
                                            }}/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            
                            <Row className="pt-3">
                                <Col xs={6} className="rounded-2 px-4 pb-3" style={{boxShadow: "0px 0px 20px 5px #0003"}}>
                                    <Row className="fs-4 fw-semibold pb-3">
                                        Security
                                    </Row>
                                    <Row>
                                        <button className="btn btn-danger w-auto">Change Password</button>
                                    </Row>
                                    <Row className="pt-3">
                                        <Col xs={12}>
                                            <Row className="fs-4 fw-semibold">
                                                Security Questions
                                            </Row>
                                            <Row className="gap-3">
                                                <Col xs={12}>
                                                    <label className="form-label">Question</label>
                                                    <input type="text" className="form-control" />
                                                </Col>
                                                <Col xs={12}>
                                                    <label className="form-label">Answer</label>
                                                    <input type="text" className="form-control" />
                                                </Col>
                                                <Col xs={12}>
                                                    <button className="btn btn-primary">Update Security Question & Answer</button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </TabContent>
                </TabContentContainer>
            </TabView>
        </Row>
    );
}