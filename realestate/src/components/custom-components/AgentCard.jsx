import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

export default function AgentCard(props){
    return (
        <Col xs={12} md={5} lg={4} xl={2} className="rounded-3" style={{boxShadow: "0px 0px 10px 5px #0002"}}>
            <Row className="justify-content-center py-3">
                <div style={{
                    width: "200px", 
                    height: "200px",
                    backgroundColor: "#AAAAAA",
                    borderRadius: "100px"
                }}>
                </div>
            </Row>
            <Row className="fs-5 fw-bold justify-content-center">
                {props.firstName} {props.lastName}
            </Row>
            <Row>
                {props.rating}  
            </Row>
            <Row>
                <Col xs={12} className=" overflow-y-hidden text-wrap" style={{height: "115px"}}>
                    <p align="justify" className="">
                        {props.bio}
                    </p>
                </Col>
            </Row>
            <Row className="py-3 px-3">
                <button className="btn btn-primary">
                    Send me a Message
                </button>
            </Row>
        </Col>
    );
}