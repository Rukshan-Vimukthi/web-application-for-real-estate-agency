import { NavContent, SideNavBar, SideNavBarItem } from "../components/bininstructions-components/Navigation/bininstructions-components";
import { Grid, HouseFill, HousesFill, Map, MapFill, PeopleFill, Plus, XSquare } from "react-bootstrap-icons";
import { FaLandmark } from "react-icons/fa/index";
import "../admin/css/admin-style.css";
import Dialog from "../components/bininstructions-components/Windows/Dialog";
import { useEffect, useRef, useState } from "react";
import { getCountries, getCities, isLoggedIn } from "../functions/common";
import { ACCESS, HOST, REFRESH } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";
import { TabContent, TabItem, TabView, SelectedImagePreview, CustomDialog } from "../components/custom-components/components";
import EstateHouseV1 from "../components/custom-components/RealEstate/EstateHouseV1";
import SelectAgent from "../admin/components/dialogs/SelectAgent";
import Lands from "../admin/pages/Lands";
import Houses from "../admin/pages/Houses";
import Agent from "../admin/components/Agent";
import Agents from "../admin/pages/Agents";
import { Col, Row } from "react-bootstrap";

export default function Admin(){
    const [allow, setAllow] = useState(false);
    const [dashBoardInformation, setDashboardInformation] = useState({});

    const [selectedHouseID, setSelectedHouseID] = useState(null);

    const navigate = useNavigate();

    const authenticate = async () => {
        const accessToken = localStorage.getItem(ACCESS);
        const refreshToken = localStorage.getItem(REFRESH);

        if (refreshToken === null || accessToken === null){
            navigate("/admin/login");
        }else{
            const decodedKey = jwtDecode(accessToken);
            const currentDate = Date.now() / 1000;
            const expDate = decodedKey.exp;
            if (currentDate > expDate){
                localStorage.clear();
                navigate("/admin/login");
            }
        }
        setAllow(true);
    }

    const [landDialogVisibility, setLandDialogVisibility] = useState(false);


    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);


    const getInformation = () => {
        api.get("api/admin/dashboard/information/fetch").then(response => {
            if (response.status === 200){
                const data = response.data;
                if (data.status == "ok"){
                    setDashboardInformation(data);
                }
            }
        });
    };

    useEffect(() => {
        if (isLoggedIn()){
            getCountries(setCountries);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            authenticate();
            getInformation();
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    if (allow){
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row bg-black">
                        <div className="col-3 p-3 fs-5 text-white fw-bolder">Admin Panel</div>
                        <div className="col-9">
                            <div className="row justify-content-end align-items-center">
                                <div className="col-1 pt-2">
                                    <a href="/logout"><button className="btn text-white" style={{backgroundColor: "#FF0000"}}>Logout</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <TabView tabAlignment="left">
                            <>
                            <TabItem id="dashboard" title="Dashboard" active={true}/>
                            <TabItem id="houses" title="Houses"/>
                            <TabItem id="lands" title="Lands"/>
                            <TabItem id="agents" title="Agents"/>
                            </>      
                            <>
                            <TabContent for="dashboard" active={true}>
                                <div className="col-12">
                                    <div className="row d-flex gap-5 justify-content-start">
                                        <div className="col-2 dashboard-card"> 
                                            <div className="row">
                                                <span className="fs-5 fw-bolder">Number of Buildings</span>
                                            </div>
                                            <div className="row justify-content-center align-items-center pt-2">
                                                <div className="col-6 d-flex flex-row justify-content-end">
                                                    <HouseFill className="fs-1"/>
                                                </div>
                                                <div className="col-6 d-flex flex-row justify-content-start">
                                                    <span className="fw-bolder fs-3 w-auto">{dashBoardInformation["propertiesSold"]}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-2 dashboard-card"> 
                                            <div className="row">
                                                <span className="fs-5 fw-bolder">Number of Lands</span>
                                            </div>
                                            <div className="row justify-content-center align-items-center pt-2">
                                                <div className="col-6 d-flex flex-row justify-content-end">
                                                    <Map className="fs-1"/>
                                                </div>
                                                <div className="col-6 d-flex flex-row justify-content-start">
                                                    <span className="fw-bolder fs-3 w-auto">{dashBoardInformation["propertiesSold"]}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-2 dashboard-card">
                                            
                                            <div className="row">
                                                <span className="fs-5 fw-bolder">properties sold</span>
                                            </div>
                                            <div className="row justify-content-center pt-2">
                                                <span className="fw-bolder fs-3 w-auto">{dashBoardInformation["propertiesSold"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-2 dashboard-card">
                                            <div className="row">
                                                <span className="fs-5 fw-bolder">properties to sell</span>
                                            </div>
                                            <div className="row justify-content-center pt-2">
                                                <span className="fw-bolder fs-3 w-auto">{dashBoardInformation["propertiesToSell"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-2 dashboard-card">
                                            <div className="row">
                                                <span className="fs-5 fw-bolder">properties reserved</span>
                                            </div>
                                            <div className="row justify-content-center pt-2">
                                                <span className="fw-bolder fs-3 w-auto">{dashBoardInformation["propertiesReserved"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-2 dashboard-card">
                                            <div className="row">
                                                <span className="fs-5 fw-bolder">properties to rent</span>
                                            </div>
                                            <div className="row justify-content-center pt-2">
                                                <span className="fw-bolder fs-3 w-auto">{dashBoardInformation["propertiesToRent"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-2 dashboard-card">
                                            <div className="row">
                                                <span className="fs-5 fw-bolder">properties rented</span>
                                            </div>
                                            <div className="row justify-content-center pt-2">
                                                <span className="fw-bolder fs-3 w-auto">{dashBoardInformation["propertiesRented"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-2 dashboard-card">
                                            <div className="row">
                                                <span className="fs-5 fw-bolder">Agents Registered</span>
                                            </div>
                                            <div className="row justify-content-center pt-2">
                                                <span className="fw-bolder fs-3 w-auto"><PeopleFill className="fs-1 me-3"/>{dashBoardInformation["agentsRegistered"]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Row>
                                        <Col sm={6} className="rounded-2" style={{}}>

                                        </Col>
                                    </Row>
                                </div>
                            </TabContent>
                            <TabContent for="houses">
                                <Houses/>
                            </TabContent>
                            <TabContent for="lands">
                                {/* <Lands/> */}
                            </TabContent>
                            <TabContent for="agents">
                                <Agents/>
                            </TabContent>
                            </>
                        </TabView>
                        
                    </div>
                </div>
            </div>
        );
    }else{
        <div className="row d-flex justify-content-center align-items-center">
            Loading...
        </div>
    }
}