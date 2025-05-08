import { Card, CardBody, CardFooter, CardHeader, CardImg, CardText, Col, Image, Row } from 'react-bootstrap';
import image from '../../assets/Home/Images/living-room-1835923_1280.jpg';
import BillionaireHouseImageForHome from "../../assets/Images/Houses/ChatGPT Image Apr 10, 2025, 11_47_53 AM.png";
import FeaturedListingBackgroundImage from "../../assets/Images/Houses/background-image-for-featured-listings-section.png";


import FeaturedListingHouse1 from "../../assets/Images/Houses/features-listing-house-1.png";
import FeaturedListingHouse2 from "../../assets/Images/Houses/features-listing-house-2.png";
import FeaturedListingHouse3 from "../../assets/Images/Houses/features-listing-house-3.png";
import FeaturedListingHouse4 from "../../assets/Images/Houses/features-listing-house-4.png";
import OfficeRoom from "../../assets/Images/Houses/realistic-office-room.png";

import "../styles/Home.css"
import { CalendarEvent, CardImage } from 'react-bootstrap-icons';

import {Calendar, Handshake, House, Search} from "lucide-react"

export default function Home(){
    return (
        <div className="row pt-4 mt-4">
            <div className="col-12 m-0 p-0">
                <div className="row d-flex vw-100 m-0 d-flex justify-content-center align-content-center p-5 px-0 px-md-0 overflow-hidden" style={{"backgroundImage": `url('${BillionaireHouseImageForHome}')`, backgroundSize: "100% 180%", backgroundRepeat: "no-repeat", backgroundPositionY: "-150px", backgroundColor: "#0005", backgroundBlendMode: "overlay"}}>
                    <div className="col-12 col-xl-6 mt-5 d-flex flex-column gap-4">

                        <div className='row pt-5 d-flex justify-content-center'>
                            <div className="col-12 col-md-10 d-flex justify-content-center text-white">
                                <h1 className='fs-1' style={{textAlign: "center"}}>
                                    Luxury Homes. Prime Lands. Tailored for the Discerning Buyer.
                                </h1>
                            </div>
                        </div>

                        <div className='row d-flex justify-content-center mb-4'>
                            <div className="col-md-10">
                                <div className="row d-flex flex-md-row flex-column justify-content-center align-items-center gap-3 gap-md-0">
                                    <div className="col-7 col-md-6">
                                        <a href='/explore'>
                                            <button className="btn fw-bolder w-100 rounded-5 p-2 text-white explore-button">
                                                Explore
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <Row className='p-5 bg-black text-white gap-5 gap-md-0'>

                    <Col md={6} className=" d-flex flex-column align-items-center justify-content-center">
                        <h3 className="text-center text-md-start">
                            Apply to become a seller
                        </h3>
                        <p className='text-center'>
                            Get a change to sell the properties by applying for seller position on the platform
                        </p>
                        <button className='btn text-white rounded-5 fs-5 py-2 px-4' style={{backgroundColor: "#000000", borderColor: "#FFFFFF", bolder: "solid", borderWidth: "2px"}}>
                            Apply for seller
                        </button>
                    </Col>

                    <Col md={6} className="col-md-6 d-flex flex-column justify-content-center align-items-center">

                        <h3>
                            Register as a buyer
                        </h3>
                        <p className='text-center'>
                            Find the best property according to your choices
                        </p>
                        <button className='btn rounded-0 text-black fs-5 rounded-5 py-2 px-4' style={{backgroundColor: "#FFAA00"}}>
                            Register
                        </button>

                    </Col>

                </Row>

                <Row className='pb-4' style={{backgroundImage: `url('${FeaturedListingBackgroundImage}')`, backgroundPositionY: "0px", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                    <Col xs={12} className='px-5'>
                        <Row className='text-white fw-bolder fs-1 text-center text-md-start justify-content-center justify-content-md-start mt-4'>
                            Featured Properties
                        </Row>
                        <Row className='pb-4 justify-content-center justify-content-xl-evenly px-0 px-xl-5 pt-3 gap-3 gap-lg-0'>
                            <Col xs={12} md={6} lg={4} xl={3} className="pt-3">
                                <Card style={{boxShadow: "0px 0px 10px 5px #0002"}}>
                                    <CardImg src={FeaturedListingHouse1} style={{height: "200px"}}/>
                                    <CardHeader className="fw-bolder">Modern 2-Bedroom Apartment</CardHeader>
                                    <CardText className="px-3">$500,000</CardText>
                                    <CardBody className="pt-0">
                                        <p className="my-0">
                                            Spacious apartment with a balcony and stunning city views.
                                        </p>
                                    </CardBody>
                                    <CardFooter>
                                        <button className='btn view-details-button rounded-2'>View Details</button>
                                    </CardFooter>
                                </Card>
                            </Col>

                            <Col xs={12} md={6} lg={4} xl={3} className="pt-3">
                                <Card style={{boxShadow: "0px 0px 10px 5px #0002"}}>
                                    <CardImg src={FeaturedListingHouse2} style={{height: "200px"}}/>
                                    <CardHeader className="fw-bolder">Modern 2-Bedroom Apartment</CardHeader>
                                    <CardText className="px-3">$500,000</CardText>
                                    <CardBody className="pt-0">
                                        <p className="my-0">
                                            Spacious apartment with a balcony and stunning city views.
                                        </p>
                                    </CardBody>
                                    <CardFooter>
                                        <button className='btn view-details-button rounded-2'>View Details</button>
                                    </CardFooter>
                                </Card>
                            </Col>

                            <Col xs={12} md={6} lg={4} xl={3} className="pt-3">
                                <Card style={{boxShadow: "0px 0px 10px 5px #0002"}}>
                                    <CardImg src={FeaturedListingHouse3} style={{height: "200px"}}/>
                                    <CardHeader className="fw-bolder">Modern 2-Bedroom Apartment</CardHeader>
                                    <CardText className="px-3">$500,000</CardText>
                                    <CardBody className="pt-0">
                                        <p className="my-0">
                                            Spacious apartment with a balcony and stunning city views.
                                        </p>
                                    </CardBody>
                                    <CardFooter>
                                        <button className='btn view-details-button rounded-2'>View Details</button>
                                    </CardFooter>
                                </Card>
                            </Col>

                            <Col xs={12} md={6} lg={4} xl={3} className="pt-3">
                                <Card style={{boxShadow: "0px 0px 10px 5px #0002"}}>
                                    <CardImg src={FeaturedListingHouse4} style={{height: "200px"}}/>
                                    <CardHeader className="fw-bolder">Modern 2-Bedroom Apartment</CardHeader>
                                    <CardText className="px-3">$500,000</CardText>
                                    <CardBody className="pt-0">
                                        <p className="my-0">
                                            Spacious apartment with a balcony and stunning city views.
                                        </p>
                                    </CardBody>
                                    <CardFooter>
                                        <button className='btn view-details-button rounded-2'>View Details</button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>


                <Row className="bg-black">
                    <Col sm={12} className='px-5 pb-5'>
                        <Row className='fs-1 fw-bolder text-white pt-4'>How it works?</Row>
                        <Row className='pt-4 gap-5 justify-content-center'>
                            <Col xs={12} md={3} className="rounded-3 px-4 py-3" style={{backgroundColor: "#88AAFF22"}}>
                                <Row className="gap-3 gap-lg-0">
                                    <Col xs={12} lg={3} className='d-flex align-items-center justify-content-center justify-content-lg-start'>
                                        <Search color='#88AAFF' width={"50px"} height={"50px"}/>
                                    </Col>
                                    <Col xs={12} lg={9}>
                                        <Row className='fw-bold justify-content-center justify-content-lg-start text-center text-lg-start' style={{color: "#88AAFF"}}>Find Your Ideal Property</Row>
                                        <Row className="justify-content-center justify-content-lg-start text-center text-lg-start pt-3 pt-lg-0" style={{color: "#88AAFF"}}>
                                            Browse our wide range of listings.
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={12} md={3} className="rounded-3 px-4 py-3" style={{backgroundColor: "#88AAFF22"}}>
                                <Row className="gap-3 gap-lg-0">
                                    <Col xs={12} lg={3} className='d-flex align-items-center justify-content-center justify-content-lg-start'><Calendar color='#88AAFF' width={"50px"} height={"50px"}/></Col>
                                    <Col xs={12} lg={9}>
                                        <Row className='fw-bold justify-content-center justify-content-lg-start text-center text-lg-start' style={{color: "#88AAFF"}}>Schedule a Viewing</Row>
                                        <Row className="justify-content-center justify-content-lg-start text-center text-lg-start pt-3 pt-lg-0" style={{color: "#88AAFF"}}>
                                            Contact agents and book property viewings easily.
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={12} md={3} className="rounded-3 px-4 py-3" style={{backgroundColor: "#88AAFF22"}}>
                                <Row className="gap-3 gap-lg-0">
                                    <Col xs={12} lg={3} className='d-flex align-items-center justify-content-center justify-content-lg-start'><Handshake color='#88AAFF' width={"50px"} height={"50px"}/></Col>
                                    <Col xs={12} lg={9}>
                                        <Row className='fw-bold justify-content-center justify-content-lg-start text-center text-lg-start' style={{color: "#88AAFF"}}>Make an Offer</Row>
                                        <Row className="justify-content-center justify-content-lg-start text-center text-lg-start pt-3 pt-lg-0" style={{color: "#88AAFF"}}>
                                            Negotiate and make an offer directly through the app.
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={12} md={3} className="rounded-3 px-4 py-3" style={{backgroundColor: "#88AAFF22"}}>
                                <Row className="gap-3 gap-lg-0">
                                    <Col xs={12} lg={3} className='d-flex align-items-center justify-content-center justify-content-lg-start'><House color='#88AAFF' width={"50px"} height={"50px"}/></Col>
                                    <Col xs={12} lg={9}>
                                        <Row className='fw-bold justify-content-center justify-content-lg-start text-center text-lg-start' style={{color: "#88AAFF"}}>Close the Deal</Row>
                                        <Row className="justify-content-center justify-content-lg-start text-center text-lg-start pt-3 pt-lg-0" style={{color: "#88AAFF"}}>
                                            Final step: complete your purchase or rental.
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row style={{background: "linear-gradient(45deg, #000 60%, #555 60%, #888 80%, #FFF 80%)"}}>
                    <Col sm={12} className='px-5 py-5'>
                        <Row className='justify-content-center align-items-center text-white gap-5 gap-md-0'>
                            <Col sm={4} className='d-flex flex-column gap-2'>
                                <Row className='fs-1 fw-bolder justify-content-center align-items-center'>About Us</Row>
                                <Row className="text-center fs-5">
                                    We are XYZ Real Estate, a leading agency helping you find the perfect home. With years of experience in the industry, we ensure a seamless buying, selling, and renting process.
                                </Row>
                            </Col>
                            <Col sm={4} className='d-flex align-items-center'>
                                <div className='rounded-4' style={{width: "350px", height: "250px", backgroundImage: `url(${OfficeRoom})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
                                {/* <Image src={OfficeRoom} style={{height: "300px"}}/> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className='p-5 bg-black text-white d-flex justify-content-center align-items-center'>
                    <Col md={6} lg={5} className="d-flex flex-column align-items-center justify-content-center gap-3">
                        <h3 className='text-center text-start'>Subscribe to our newsletter</h3>

                        <p className='text-center fs-5'>
                            Get emails about new houses, lands and when the rented houses available.
                        </p>

                        <input type='email' className='form-control text-white bg-white' placeholder='Enter your email'/>
                        <button 
                            className='btn btn-primary rounded-3 fs-5 py-2 px-4 fw-bolder' 
                            style={{
                                borderColor: "#FFFFFF", 
                                bolder: "solid", 
                                borderWidth: "2px"
                            }}>
                                SUBSCRIBE
                        </button>
                    </Col>
                </Row>

            </div>
        </div>
    );
}