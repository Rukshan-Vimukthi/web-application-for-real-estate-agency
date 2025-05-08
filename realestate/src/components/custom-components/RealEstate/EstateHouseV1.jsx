import { EnvelopePlusFill } from "react-bootstrap-icons";
import 'react-bootstrap-icons'
import {FaBed, FaShower, FaSquarespace} from 'react-icons/fa/index'
import { GiHomeGarage } from "react-icons/gi/index"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initChat, isLoggedIn } from "../../../functions/common";
import SlideShow from "../../Slideshow/SlideShow";


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

export default function EstateHouseV1(props){
    let tagColor = "#00AAFF55";
    let tagTextColor = "#000000";
    const [status, setStatus] = useState("");
    let availableDate = <p> </p>;

    const navigate = useNavigate();

    const images = props.images;
    const numberOfBedrooms = props.bedroomCount;
    const numberOfBathRooms = props.bathRoomsCount;
    const numberOfGarages = props.garagesCount;
    const area = props.area;

    useEffect(() => {
        console.log(images);
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
        if (loggedIn){
            const chatInitResponse = await initChat(data.agentId);
            if(chatInitResponse){
                navigate("/user/chatroom");
            }
        }else{
            localStorage.clear();
            navigate("/login");
        }
    }

    return (
        <div className="col-12 col-md-5 col-lg-4 col-xl-3 p-0">
            <div className="row justify-content-center">
                <div className="col-12 col-md-12 card p-0">
                    <SlideShow images={images} id={props.id} />
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
                            <div className="row pb-2 gap-1">
                                <div className="col-2 p-0">
                                    <FaBed/> {numberOfBedrooms}
                                </div>
                                <div className="col-2 p-0">
                                    <FaShower/> {numberOfBathRooms}
                                </div>
                                <div className="col-2 p-0">
                                    <GiHomeGarage/> {numberOfGarages}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 p-0">
                                    <FaSquarespace/> {area} sqft
                                </div>
                            </div>
                            <div className="row">
                                <span className="px-0 pt-3" style={{fontSize: "14px"}}>{props.address}</span>
                            </div>
                            <div className="row pt-2">
                                <div className="col-3 p-0">
                                    Price
                                </div>
                                <div className="col-9 p-0 d-flex justify-content-end">
                                    ${props.price}
                                </div>
                            </div>
                            <div className="row d-flex flex-row">
                                <span className="fw-bolder w-auto">Assigned agent: </span><span className="fw-bolder w-auto">{props.agent}</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        {props.children}
                        {/* <div className="row">
                            <div className="col-12 d-flex flex-row gap-3 pb-2">
                                <button className="btn btn-primary w-100">View Property</button>
                                <button className="btn text-white bg-black w-100">Request a visit</button>
                            </div>
                            <div className="col-12">
                                <button className="btn text-white bg-black w-100 d-flex align-items-center justify-content-center gap-3" onClick={ () => {
                                    initiateChat(props);
                                }}><EnvelopePlusFill className="fs-4"/> Message</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
