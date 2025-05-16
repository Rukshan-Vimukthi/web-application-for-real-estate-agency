import { Col, Row } from "react-bootstrap";
import ListHouseForm from "../../../components/custom-components/ListHouseForm";
import { useEffect, useRef, useState } from "react";
import api from "../../../api/api";
import EstateHouse from "../../../components/EstateHouse";
import Dialog from "../../../components/custom-components/Dialog";
import HouseUpdateDialog from "../../../components/custom-components/dialogs/HouseUpdateDialog";

export default function Listings(props){
    const [showHouseListingForm, setShowHouseListingForm] = useState();
    const [houses, setHouses] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null);
    
    const getAllHouses = async() => {
        const response = await api.post("/api/v1/agent/houses");
        if (response.status === 200){
            if (response.data.status == "ok"){
                setHouses(response.data.houses);
            }
        }
    }

    const deleteHouse = async(houseID) => {
        const response = await api.post("/api/admin/house/delete", {id: houseID});
        if (response.status === 200){
            if (response.data.status == "ok"){
                alert("House deleted successfully!");
            }
        }
    }

    const [showUpdateHouseDialog, setShowUpdateHouseDialog] = useState(false);
    const showUpdateHouseDialogRef = useRef(showUpdateHouseDialog);
    const setShowUpdateHouseDialogRef = (data) => {
        setShowUpdateHouseDialog(data);
        showUpdateHouseDialogRef.current = data;
    };

    const updateHouseData = async() => {

    }

    useEffect(() => {
        const interval = setInterval(() => {
            getAllHouses();
        }, 1000);
        return () => clearInterval(interval);
    })
    return (
        <Col xs={12}>
            <Row>
                <ListHouseForm 
                    visible={showHouseListingForm} 
                    setVisibility={setShowHouseListingForm} />
                <HouseUpdateDialog visible={showUpdateHouseDialogRef.current} setVisible={setShowUpdateHouseDialogRef} houseData={selectedHouse} />
                <Col xs={12}>
                    <Row>
                        <button 
                            className="btn btn-primary w-auto"
                            onClick={() => {
                                setShowHouseListingForm(true);
                            }}>
                                List a House
                            </button>
                    </Row>
                    <Row className="pt-3">
                        {houses.map((house) => {
                            // console.log(house)
                            const images = [null];
                            house.media.forEach(element => {
                                if(element.isThumbnail){
                                    images[0] = element.mediaPath
                                }else{
                                    images.push(element.mediaPath);
                                }
                            });

                            const refreshedImages = images.slice(1);

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
                            >
                                <Row className="w-100 gap-3 justify-content-center">
                                    <Col xs={12} md={5} className="">
                                        <Row>
                                            <button 
                                                className="btn btn-success"
                                                onClick={() => {
                                                    setSelectedHouse(house);
                                                    setShowUpdateHouseDialogRef(true);
                                                }}>
                                                UPDATE
                                            </button>
                                        </Row>
                                    </Col>
                                    <Col xs={12} md={5} className="">
                                        <Row>
                                            <button className="btn btn-danger" onClick={() => {
                                                deleteHouse(house.houseId);
                                            }}>
                                                DELETE
                                            </button>
                                        </Row>
                                    </Col>
                                </Row>
                            </EstateHouse>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </Col>
    );
}