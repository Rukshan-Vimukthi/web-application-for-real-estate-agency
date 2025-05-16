import { Col, Row } from "react-bootstrap"
import {Facebook, Instagram, TwitterX, Youtube} from "react-bootstrap-icons"


export default function Footer(){
    return (
        <Row className="vw-100 bg-white mt-3 mt-md-5 h-100">
            <Col xs={12} className="">
                <Row className="p-5 d-flex flex-column flex-md-row gap-5 gap-md-2">
                    <Col xs={12} md={3} className="d-flex justify-content-center fs-1 fw-bolder mb-3 mb-md-0">
                        Logo
                    </Col>
                    <Col xs={12} md={2} className="">
                        <Row className="d-flex justify-content-center">
                                <h3 className="p-1 w-auto align-self-center">Contact Us</h3>
                        </Row>
                        <Row className="pt-3 d-flex justify-content-center">
                                <ul className="list-group list-unstyled">
                                    <li className="list-inline-item p-1 align-self-center">example@gmail.com</li>
                                    <li className="list-inline-item p-1 align-self-center">Live chat</li>
                                    <li className="list-inline-item p-1 align-self-center">+xx xxx-xxx-xxx</li>
                                </ul>
                        </Row>
                    </Col>

                    <Col xs={12} md={3} className="">
                        <Row className="d-flex justify-content-center">
                            <h3 className="p-1 w-auto w-md-100 md-3 mb-md-0">Follow Us</h3>
                        </Row>
                        <Row className="pt-4">
                            <Col xs={12} className="d-flex flex-row justify-content-center gap-3 fs-4">
                                <Facebook/>
                                <Instagram/>
                                <TwitterX/>
                                <Youtube/>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={12} md={3} className="">
                        <Row className="row d-flex justify-content-center">
                            <h3 className="p-1 w-auto md-3 mb-md-0">About Us</h3>
                        </Row>
                        <Row className="pt-3">
                            <ul className=" list-unstyled d-flex flex-column align-items-center">
                                <a className="link text-decoration-none text-black" href="#"><li>Terms & Conditions</li></a>
                                <a className="link text-decoration-none text-black" href="#"><li>Privacy Policy</li></a>
                                <a className="link text-decoration-none text-black" href="#"><li>Reviews</li></a>
                                <a className="link text-decoration-none text-black" href="#"><li>FAQs</li></a>
                            </ul>
                        </Row>
                    </Col>
                </Row>
                <Row className="p-3 bg-black text-white flex-column flex-md-row">
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-start">
                        2024 &copy; All rights reserved.
                    </Col>
                    <Col xs={12} md={6} className="col-12 col-md-6">
                        <Row className="d-flex justify-content-center justify-content-md-end">
                            <span className="bg-primary p-1 px-2 px-md-5 rounded-1 w-auto">Developed by Rukshan</span>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}