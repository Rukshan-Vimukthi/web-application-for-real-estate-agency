import { useEffect, useState, useRef } from "react";
import EstateHouse from "../../components/EstateHouse";
import EstateItem from "../../components/EstateItem";
import api from "../../api/api";
import { ACCESS, HOST } from "../../constants/constants";
import Loading from "../../components/Loading";
import { Filter, X } from "react-bootstrap-icons";
import { Col, Row } from "react-bootstrap";
import RequestPropertyVisitDialog from "../../components/RequestPropertyVisitDialog.jsx";


import BillionaireHouseImage from "../../assets/Images/Houses/ChatGPT Image Apr 10, 2025, 10_45_27 AM.png"

export default function Estates(){

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({});
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null);

    const [showRequestAVisitDialog, setShowRequestAVisitDialog] = useState(false);
    const showRequestAVisitDialogRef = useRef(showRequestAVisitDialog);
    const setShowRequestAVisitDialogRef = (data) => {
        setShowRequestAVisitDialog(data);
        showRequestAVisitDialogRef.current = data;
    }

    const [expandFilter, setExpandFilter] = useState(false);

    const [loading, setLoading] = useState(false);

    const getCountries = () => {
        api.get("/api/v1/country-list").then(response => {
            if (response.status === 200){
                const data = response.data.data;
                const countryList = [];
                data.forEach(element => {
                    countryList.push(<option value={element.id}>{element.name}</option>);
                });
                setCountries(data => {
                    return countryList;
                })
            }
        });
    };

    const getStates = (countryID) => {
        api.post("/api/v1/state-list", {id: countryID}).then(response => {
            if (response.status === 200){
                const data = response.data.data;
                const stateList = [];
                data.forEach(element => {
                    stateList.push(<option value={element.id}>{element.name}</option>);
                });

                setStates(data => {
                    return stateList;
                })
            }
        });
    }

    const getCities = (stateID) => {
        api.post("/api/v1/city-list", {id: stateID}).then(response => {
            if (response.status === 200){
                const data = response.data.data;
                const cityList = [];
                data.forEach(element => {
                    cityList.push(<option value={element.id}>{element.name}</option>);
                });

                setCities(data => {
                    return cityList;
                })
            }
        });
    }

    const loadHomes = (data_) => {
        api.post("/api/v1/houses", {"filters": data_ ? data_ : filter}).then(response => {
            if (response.status === 200){
                const data = Object.values(response.data.data);

                let _items_ = data.map((house) => {
                    const images = [null];
                    house.media.forEach(element => {
                        if(element.isThumbnail){
                            images[0] = element.mediaPath
                        }else{
                            images.push(element.mediaPath);
                        }
                    });

                    const refreshedImages = images.slice(1);

                    // alert(house.title)
                    return (
                    <EstateHouse 
                        key={house.houseId}
                        id={house.houseId}
                        title={house.title}
                        description={house.description}
                        yearBuilt={house.yearBuilt}
                        dateListed={house.dateListed}
                        images={images[0] == null ? refreshedImages : images}
                        price={house.price} 
                        country={house.country}
                        state={house.state}
                        city={house.city}
                        street={house.street}
                        garagesCount={house.numberOfGarages}
                        bathRoomsCount={house.numberOfBathrooms}
                        bedroomCount={house.numberOfBedrooms} 
                        cooling={house.cooling} 
                        heating={house.heating} 
                        area={house.area}
                        status={house.status}
                        date={house.availableDate}
                        agent={house.agentUserName}
                        agentProfileImage={house.agentProfileImage}
                        agentId={house.agentId}
                        agentFirstName={house.agentFirstName}
                        agentLastName={house.agentLastName}
                        onRequestVisit={() => {
                            setShowRequestAVisitDialogRef(true);
                            setSelectedHouse(house.houseId);
                        }}
                    />
                    );
                });

                setItems(_items_);
            }
        });
    }


    const applyFilter = () => {
        const searchKeyword = document.getElementById("search");
        const propertyType = document.getElementById("property-type");
        const country = document.getElementById("country");
        const state = document.getElementById("state");
        const city = document.getElementById("city");
        const forSelling = document.getElementById("selling");
        const fotRenting = document.getElementById("renting");
        const minPrice = document.getElementById("min-price");
        const maxPrice = document.getElementById("max-price");
        const data = {
            searchKeyword: searchKeyword.value,
            propertyType: propertyType.value,
            country: country.value,
            state: state.value,
            city: city.value,
            forSelling: forSelling.checked,
            fotRenting: fotRenting.checked,
            minPrice: minPrice.value,
            maxPrice: maxPrice.value
        }

        setFilter(data);
        loadHomes(data);
    };

    useEffect(() => {
        loadHomes();
        getCountries();
    }, []);

    return (
        <div className="row pt-2 h-auto mt-5">

            <RequestPropertyVisitDialog houseID={selectedHouse} visible={showRequestAVisitDialogRef.current} setVisible={setShowRequestAVisitDialogRef}>

            </RequestPropertyVisitDialog>

            <div className="d-flex position-fixed ms-3 mt-2 align-items-center justify-content-center" 
                style={
                    {
                        width: "50px", 
                        height: "50px", 
                        backgroundColor: "#0088FF", 
                        borderRadius: "25px",
                        zIndex: 4000
                    }
                } onClick={() => {
                    setExpandFilter(!expandFilter);
                }}>
                    {!expandFilter ? <Filter className="text-white fs-1 fw-bolder" /> : <X className="text-white fs-1 fw-bolder" /> }
                
            </div>

            <div className={(expandFilter ? "d-flex" : "d-none" ) + " bg-white col-2 rounded-3 pt-4 ps-4 pe-4 pb-3 d-flex flex-column gap-2 position-fixed top-5 start-0 vh-75 z-3 ms-5 mt-3"} style={{backgroundColor: "#00000005", boxShadow: "0px 0px 10px 1px #000"}}>
                <div className="row">
                    <input className="form-control" placeholder="search" id="search"/>
                </div>
                <div className="row">
                    <button className="btn btn-primary">Search</button>
                </div>
                <div className="row">
                    <select className="form-select" id="property-type" onChange={applyFilter}>
                        <option>Select Type</option>
                        <option selected={true}>House</option>
                        <option>Land</option>
                    </select>
                </div>
                <div className="row">
                    <select className="form-select" id="country" onChange={ (event) => {applyFilter(); getStates(event.target.value);}}>
                        <option value={0}>Select Country</option>
                        {countries}
                    </select>
                </div>
                <div className="row">
                    <select className="form-select" id="state" onChange={ (event) => {applyFilter(); getCities(event.target.value);}}>
                        <option value={0}>Select State</option>
                        {states}
                    </select>
                </div>
                <div className="row">
                    <select className="form-select" id="city" onChange={ () => {applyFilter();}}>
                        <option value={0}>Select City</option>
                        {cities}
                    </select>
                </div>
                <div className="row d-flex align-items-center pt-3">
                    <div className="col-10">
                        <label className="form-label">For selling</label>
                    </div>
                    <div className="col-2">
                        <input type="checkbox" className="form-check" id="selling" onChange={ () => {applyFilter();}}/>
                    </div>
                </div>
                <div className="row d-flex align-items-center">
                    <div className="col-10">
                        <label className="form-label">For renting</label>
                    </div>
                    <div className="col-2">
                        <input type="checkbox" className=" form-check" id="renting" onChange={() => {applyFilter()}}/>
                    </div>
                </div>
                <div className="row pt-3">
                    <label  className="pb-2">Price Range</label>
                    <div className="col-12 d-flex flex-column">
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="">Min</label>
                            </div>
                            <div className="col-6 d-flex justify-content-end" id="min-value">
                                Value
                            </div>
                        </div>
                        <div className="row">
                            <input type="range" id="min-price" onMouseUp={() => {applyFilter()}}/>
                        </div>
                    </div>
                    <div className="col-12 d-flex flex-column">
                        <div className="row">
                            <div className="col-6">
                                <label>Max</label>
                            </div>
                            <div className="col-6 d-flex justify-content-end" id="max-value">
                                Value
                            </div>
                        </div>
                        <div className="row">
                            <input type="range" id="max-price" onMouseUp={applyFilter}/>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <button className="btn btn-dark" onClick={() => {
                            setFilter({});
                            loadHomes();
                        }}>Clear Filter</button>
                    </div>
                </div>
            </div>

            <div className="col-12" >
                <Row className="justify-content-center align-items-center" style={{width: "100vw", height: "400px", backgroundImage: `url('${BillionaireHouseImage}')`, backgroundSize: "cover", backgroundPositionY: "-500px"}}>
                    <Col sm={5} className="pb-5 mb-4" style={{backgroundColor: "#0006"}}>
                        <Row className="fs-1 fw-bolder text-white justify-content-center">
                            Find Your Dream Home
                        </Row>
                        <Row className="text-white text-center">
                            From cozy apartments to luxury estates, explore a wide range of properties tailored to your lifestyle and budget.
                        </Row>
                        <Row className="justify-content-center">
                            <Col sm={12}>
                                <input type="text" className="form-control bg-white" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className="row">
                    <div className="col-12 p-4 p-md-4">
                        {loading ? <Loading/> : 
                        <Row className="flex-wrap justify-content-start gap-4 p-5" style={{marginTop: "-90px"}}>
                            {items}
                        </Row>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}