import { EnvelopePlusFill, HeartFill } from "react-bootstrap-icons";
import 'react-bootstrap-icons'
import {FaBed, FaShower, FaBath, FaSquarespace} from 'react-icons/fa/index'
import { GiHomeGarage } from "react-icons/gi/index"
import { useEffect, useState } from "react";
import SlideShow from "./Slideshow/SlideShow";
import { useNavigate } from "react-router-dom";
import { initChat, isLoggedIn } from "../functions/common";
import api from "../api/api";

import {Col} from "react-bootstrap"


/**
 * props:
 * @param image: [],
 * @param bedroomCount: int,
 * @param bathRoomsCount: int,
 * @param garagesCount: int,
 * @param area: int,
 * @param status: int,
 * @param address: str,
 * @param agent: str
*/
export default function EstateHouse(props){

    let tagColor = "#00AAFF55";
    let tagTextColor = "#000000";
    const [status, setStatus] = useState("");
    let availableDate = <p> </p>;

    const navigate = useNavigate();

    let image = props.images;


    let numberOfBedrooms = props.bedroomCount;
    let numberOfBathRooms = props.bathRoomsCount;
    let numberOfGarages = props.garagesCount;
    let area = props.area;

    useEffect(() => {
        if (props.status == 1){
            setStatus("available");
            tagColor = "#0000FF55";
            tagTextColor = "#0000BB";
        }else if(props.status == 2){
            setStatus("sold out");
            tagColor = "#FF000055";
            tagTextColor = "#BB0000";
        }else if(props.status == 3){
            setStatus("checking");
            tagColor = "#00FF0055";
            tagTextColor = "#00BB00";
        }else if(props.status == 4){
            setStatus("rented");
            tagColor = "#FF000055";
            tagTextColor = "#BB0000";
            availableDate = <p>until {props.date}</p>
        }
    });


    const initiateChat = async(data) => {
        const loggedIn = isLoggedIn();
        console.log(data);
        if (loggedIn){
            // const chatInitResponse = await initChat(data.agentId);
            let initSuccess = false;
            const response = await api.post("api/v1/user/chat/initialize", {agent_id: props.agentId});
            if (response.status == 200){
                const data = response.data;
                if(data.status == "ok"){
                    initSuccess = true;
                }
            }

            if(initSuccess){
                navigate("/user/chatroom");
            }
        }else{
            navigate("/login");
        }
    }

    return (
        <div className="col-12 col-md-4 card p-0" style={{width: "23rem"}}>
            {/* <div className="card-img">
                <img src={image} width={"100%"} height={"200px"}/>
            </div> */}
            <SlideShow images={image} id={"slideshow-" + props.id}/>
            <div className="card-body">
                <div className="col-12 px-2">
                    <div className="row d-flex flex-xl-column align-items-start">
                        <div className="w-auto p-0">
                            <span className="w-auto d-flex justify-content-center rounded-2 px-3" style={{backgroundColor: tagColor, color: tagTextColor}}>{status}</span>
                        </div>
                        <div className="w-auto p-0" style={{color: tagTextColor}}>
                            {availableDate}
                        </div>
                    </div>
                    <div className="row pb-2 gap-2">
                        <div className="col-2 p-0">
                            <FaBed/> {numberOfBedrooms}0
                        </div>
                        <div className="col-2 p-0">
                            <FaShower/> {numberOfBathRooms}00
                        </div>
                        <div className="col-2 p-0">
                            <GiHomeGarage/> {numberOfGarages}00
                        </div>
                        <div className="col-5 p-0">
                            <FaSquarespace/> {area} sqft
                        </div>
                    </div>
                    <div className="row">
                        <span className="px-0 pt-3">{props.city.name}, {props.country.name}</span>
                        <span className="px-0 pt-3" style={{fontSize: "12px", height: "50px"}}>{props.address}</span>
                    </div>
                    <div className="row pt-2">
                        <div className="col-12 p-0 d-flex ">
                            ${props.price}
                        </div>
                    </div>
                    <div className="row d-flex flex-row pt-2">
                        {props.agent ?
                        <Col sm={12} className="d-flex align-items-center gap-3">
                            <div style={{width: "40px", height: "40px", backgroundColor: "#BBBBBB",  borderRadius: "20px", background: `url('${props.agentProfileImage ? props.agentProfileImage : null}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}}></div>
                            <span className="fw-bolder w-auto">{props.agent}</span>
                        </Col>
                        : <></> }
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex flex-lg-row flex-column gap-2 justify-content-center">
                {props.children ? props.children :
                    <div className="row">
                        <div className="col-12 d-flex flex-row gap-3 pb-2">
                            <button className="btn btn-primary w-100">View Property</button>
                            <button className="btn text-white bg-black w-100">Request a visit</button>
                        </div>
                        <div className="col-12">
                            <button className="btn text-white bg-black w-100 d-flex align-items-center justify-content-center gap-3" onClick={ () => {
                                initiateChat(props);
                            }}><EnvelopePlusFill className="fs-4"/> Message</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}