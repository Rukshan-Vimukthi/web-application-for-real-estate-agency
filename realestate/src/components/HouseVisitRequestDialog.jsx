import { Col, Row } from "react-bootstrap";
import Dialog from "./custom-components/Dialog";
import { useEffect, useState } from "react";
import { Calendar, Calendar2, Calendar2Day, Calendar2DayFill, Calendar2Fill, Calendar3Fill, CalendarFill, Clock, EnvelopeAtFill, PersonFill, TelephoneFill } from "react-bootstrap-icons";
import { FaCalendar, FaPhone } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";

export default function HouseVisitRequestDialog(props){
    const [requestData, setRequestData] = useState({});

    return (
        <Dialog 
        xs={11}
        sm={11}
        md={6}
        lg={5}
        xl={5}
        xxl={5}
        title={props.title} 
        backgroundColor="#FFF" 
        visible={props.visible} 
        setVisible={props.setVisible}>
            <Col xs={12}>
                {/* {props.requestData} */}
                <Row className="">
                    <Col xs={12} className="d-flex gap-2 align-items-center">
                        <PersonFill />{props.requestData?.buyer?.userName}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="d-flex gap-2 align-items-center">
                        <EnvelopeAtFill/>{props.requestData?.buyer?.email}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="d-flex gap-2 align-items-center">
                        <TelephoneFill />{props.requestData?.buyer?.phoneNumber}
                    </Col>
                </Row>
                <Row className="">
                    <Col xs={12} className="d-flex gap-2 align-items-center">
                        <Calendar2 />{props.requestData?.date} {props.requestData?.timeSlot?.timeSlot} <Clock />{props.requestData?.time}
                    </Col>
                </Row>
                <Row className="fs-6 pt-3">
                    <p>Dear {props?.requestData?.agentName},</p>
                    <p>
                        {props?.requestData?.extraNote}
                    </p>
                </Row>
                <Row>
                    <span>Warm regards,<br/></span>
                    <strong>{props?.requestData?.buyer?.userName?.split(' ')[0]}</strong>
                </Row>
            </Col>
        </Dialog>
    );
}