import { useEffect, useState } from "react";
import Dialog from "./custom-components/Dialog.jsx";
import {Row, Col} from "react-bootstrap";
import api from "../api/api.jsx";

export default function RequestPropertyVisitDialog(props){

    const [timeSlots, setTimeSlots] = useState([]);

    const postVisitRequest = async() => {
        const data = {
            propertyID: props.houseID,
            date: document.getElementById("date").value,
            timeSlot: document.getElementById("timeSlot").value,
            time: document.getElementById("time").value,
            extraNote: document.getElementById("extra-note").value,
        }

        const response = await api.post("/api/v1/estates/request_a_visit", data);
        if (response.status === 200){
            if (response.data.status == "ok"){
                props.setVisible(false);
            }
        }
    }

    const getTimeSlots = async() => {
        const response = await api.get("/api/v1/estates/get_time_slots");
        if (response.status === 200){
            if (response.data.status == "ok"){
                setTimeSlots(response.data.data);
            }
        }
    };

    useEffect(() => {
        getTimeSlots();
    }, []);
    return (
        <Dialog xs={11} sm={10} md={9} lg={8} xl={6} xxl={6} 
        title="Request a visit"
        backgroundColor="#FFF" 
        visible={props.visible} 
        setVisible={props.setVisible}>
            <Col xs={12} className="px-3 d-flex flex-column gap-2">
                {/* <Row>
                    <Col xs={12}>
                        <label className=" form-label">Full Name</label>
                        <input type="text" className="form-control"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <label className=" form-label">Email</label>
                        <input type="text" className="form-control"/>
                    </Col>
                    <Col xs={12} md={6}>
                        <label className=" form-label">Phone Number</label>
                        <input type="text" className="form-control"/>
                    </Col>
                </Row> */}
                <Row>
                    <Col xs={12} md={4} className="">
                        <label className=" form-label">Preferred Date</label>
                        <input type="date" className="form-control text-black" id="date"/>
                    </Col>

                    <Col xs={12} md={4}>
                        <label className=" form-label">Preferred Time Slot</label>
                        <select className=" form-select" id={"timeSlot"}>
                            {timeSlots.map(item => {
                                return <option value={item.id}>{item.timeSlot}</option>
                            })}
                        </select>
                    </Col>

                    <Col xs={12} md={4}>
                        <label className=" form-label">Time</label>
                        <input type="time" className="form-control text-black" id="time"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <label className=" form-label">Extra Note:</label>
                        <textarea className="form-control text-black" rows="5" id="extra-note" placeholder="Add any extra information you need to add here">
                            
                        </textarea>
                    </Col>
                </Row>
                <Row className="justify-content-end pt-3">
                    <button className="btn btn-primary w-auto" onClick={() => {
                        postVisitRequest();
                    }}>Requst a visit</button>
                </Row>
            </Col>
        </Dialog>
    );
}