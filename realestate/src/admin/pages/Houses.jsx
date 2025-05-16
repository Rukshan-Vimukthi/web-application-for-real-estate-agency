import { Filter, Plus, X, XSquare } from "react-bootstrap-icons";
import Dialog from "../../components/bininstructions-components/Windows/Dialog";
import { SelectedImagePreview, CustomDialog } from "../../components/custom-components/components";
import SelectAgent from "../components/dialogs/SelectAgent";
import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import { HOST } from "../../constants/constants";
import EstateHouseV1 from "../../components/custom-components/RealEstate/EstateHouseV1";
import { getCountries, getCities, isLoggedIn } from "../../functions/common";


import "../css/admin-style.css";
import DeleteConfirmationDialog from "../../components/bininstructions-components/Windows/DeleteConfirmationDialog";
import EstateHouse from "../../components/EstateHouse";
import { Col, Row } from "react-bootstrap";
import ListHouseForm from "../../components/custom-components/ListHouseForm";


export default function Houses() {
    const [houses, setHouses] = useState([]);

    const [showHouseDeleteConfirmation, setShowHouseDeleteConfirmation] = useState(false);

    const [homeDialogVisibility, setHomeDialogVisibility] = useState(false);

    const [selectedImagesForUpdate, setSelectedImagesForUpdate] = useState([]);

    const [expandFilter, setExpandFilter] = useState(false);


    const [updateHomeVisibility, setUpdateHomeVisibility] = useState(false);
    const [selectAgentVisibility, setSelectAgentVisibility] = useState(false);
    const selectAgentVisibilityRef = useRef(selectAgentVisibility);
    const setSelectAgentVisibilityRef = data => {
        selectAgentVisibilityRef.current = data;
        setSelectAgentVisibility(data);
    }

    const [selectedAgentId, setSelectedAgentId] = useState(null);
    const selectedAgentIdRef = useRef(selectedAgentId);
    const setSelectedAgentIdRef = data => {
        setSelectedAgentId(data);
        selectedAgentIdRef.current = data;
    }

    const [selectedAgentInformation, setSelectedAgentInformation] = useState({});
    const selectedAgentInformationRef = useRef(selectedAgentInformation);
    const setSelectedAgentInformationRef = data => {
        setSelectedAgentInformation(data);
        selectedAgentInformationRef.current = data;
    }

    const [selectedHouseID, setSelectedHouseID] = useState(null);

    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);

    const [filter, setFilter] = useState({});
    // const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    // const [cities, setCities] = useState([]);


    const [filterString, setFilterString] = useState("");
    const [filterData, setFilterData] = useState({});

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

    const getHouseList = async() => {
      // alert(filterString);
      setFilterString(filterString);
      const response = await api.post("api/v1/houses" + filterString);
      if (response.status === 200){
          const data = response.data["data"];
          // console.log(response.data);

          const summary = response.data.summary;
          setFilterData(summary);

          const estateElements = [];
          data.forEach(estate => {
              // console.log(estate);
              const images = [null];
              estate.media.forEach(mediaObj => {
                  // mediaFiles.push(mediaObj["mediaPath"]);

                  if(mediaObj["isThumbnail"]){
                      const thumbnail = mediaObj["mediaPath"];
                      images[0] = thumbnail;
                      // console.log(thumbnail);
                  }else{
                      images.push(mediaObj["mediaPath"]);
                    }
              });

              // if (images)
              const refreshedImages = images.slice(1, images.length - 1);
              // console.log(images)
              // console.log(estate.area, refreshedImages);

              // <EstateHouse key={element.houseId}
                    
              // />

              // console.log(estate);

              estateElements.push(<EstateHouse 
                  key={estate.houseId}
                  id={estate.houseId}
                  images={images[0] == null ? refreshedImages : images} 
                  price={estate.price} 
                  country={estate.country}
                  city={estate.city}
                  address={estate.addressLine1 + ", " + estate.addressLine2}
                  garagesCount={estate.numberOfGarages}
                  bathRoomsCount={estate.numberOfBathrooms}
                  bedroomCount={estate.numberOfBedrooms}
                  area={estate.area}
                  status={estate.status}
                  date={estate.price}
                  agent={estate.agentUserName}
                  agentProfileImage={estate.agentProfileImage}
                  agentId={estate.agentId}
                  agentFirstName={estate.agentFirstName}
                  agentLastName={estate.agentLastName} >
                        <Col xs={12}>
                          <Row className="gap-2 justify-content-center">
                            <Col xs={12} md={5}>
                              <Row>
                                <button className="btn btn-primary" onClick={() => {
                                    setUpdateHomeVisibility(true);

                                    const bedroomCount = document.getElementById("number-of-bedrooms-update");
                                    const bathRoomCount = document.getElementById("number-of-bathrooms-update");
                                    const garageCount = document.getElementById("number-of-garages-update");
                                    const floorCount = document.getElementById("number-of-floors-update");
                                    const areaCount = document.getElementById("area-update");
                                    const priceCount = document.getElementById("price-update");
                                    // const description = document.getElementById("");
                                    const address = document.getElementById("address-update");
                                    const city = document.getElementById("city-update");
                                    const country = document.getElementById("country-update");
                                    const agentName = document.getElementById("agent-name");
                                    
                                    bedroomCount.value = estate.numberOfBedrooms;
                                    bathRoomCount.value = estate.numberOfBathrooms;
                                    garageCount.value = estate.numberOfGarages;
                                    floorCount.value = estate.floorCount;
                                    areaCount.value = estate.area;
                                    priceCount.value = estate.price;
                                    // description.value = estate.description;
                                    address.value = estate.addressLine1;
                                    city.value = estate.city.name;
                                    country.value = estate.country.name;
                                    if (estate.agentFirstName === null || estate.agentLastName === null){
                                        agentName.innerText = estate.agentFirstName + " " + estate.agentLastName;
                                    }else{
                                        agentName.innerText = estate.agentUserName;
                                    }
                                    
                                    setSelectedHouseID(estate.houseId);
                                    // alert(estate.houseId);
                                }}>Edit</button>
                              </Row>
                            </Col>
                            <Col xs={12} md={5}>
                              <Row>
                                <button className="btn" style={{backgroundColor: "#FF0000", color: "#FFFFFF"}} onClick={() => {
                                    setSelectedHouseID(estate.houseId);
                                    setShowHouseDeleteConfirmation(true);
                                  }}>
                                    Delete
                                </button>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                    </EstateHouse>);

            });

            const ids = Object.keys(data);

            setHouses(estateElements);
        }
    };


    const updateHouse = () => {
        const bedroomCount = document.getElementById("number-of-bedrooms-update");
        const bathRoomCount = document.getElementById("number-of-bathrooms-update");
        const garageCount = document.getElementById("number-of-garages-update");
        const floorCount = document.getElementById("number-of-floors-update");
        const areaCount = document.getElementById("area-update");
        const priceCount = document.getElementById("price-update");
        // const description = document.getElementById("");
        const address = document.getElementById("address-update");
        const city = document.getElementById("city-update");
        const state = document.getElementById("state-update");
        const country = document.getElementById("country-update");
        const fileChooser = document.getElementById("file-selector-update");
        const images = fileChooser.files;
        // alert(images.length);
        // console.log(images);

        if (bedroomCount.value == '' || 
            bathRoomCount.value == '' ||
            garageCount.value == '' ||
            floorCount.value == '' ||
            areaCount.value == '' ||
            priceCount.value == '' ||
            address.value == '' ||
            state.value == '' ||
            city.value == ''){
              if (bedroomCount.value == ''){
                bedroomCount.style.border = "solid";
                bedroomCount.style.borderColor = "#FF0000";
              }
              if(bathRoomCount.value == ''){
                bathRoomCount.style.border = "solid";      
                bathRoomCount.style.borderColor = "#FF0000";      
              }
              if(garageCount.value == ''){
                garageCount.style.border = "solid";      
                garageCount.style.borderColor = "#FF0000";      
              }
              if(floorCount.value == ''){
                floorCount.style.border = "solid";      
                floorCount.style.borderColor = "#FF0000";      
              }
              if(areaCount.value == ''){
                areaCount.style.border = "solid";      
                areaCount.style.borderColor = "#FF0000";      
              }
              if(priceCount.value == ''){
                priceCount.style.border = "solid";      
                priceCount.style.borderColor = "#FF0000";      
              }
              if(address.value == ''){
                address.style.border = "solid";      
                address.style.borderColor = "#FF0000";      
              }
              if (city.value == ''){
                city.style.border = "solid";      
                city.style.borderColor = "#FF0000";      
              }
        }else{

          const data = {
              "houseID": selectedHouseID,
              "bedroomCount": bedroomCount.value,
              "bathRoomCount": bathRoomCount.value,
              "garageCount": garageCount.value,
              "floorCount": floorCount.value,
              "areaCount": areaCount.value,
              "priceCount": priceCount.value,
              // "description": description.value,
              "address": address.value,
              "city": city.value,
              "country": country.value,
              "agentId": selectedAgentInformation["id"],
              // "images": images
          }

          // console.log(data);

          selectedImagesForUpdate.forEach(element => {

            let fileObjIndex = Number.parseInt(element.props.children.props.id.split("selected-house-image-update-")[1]);

            let selectedFile = images[fileObjIndex];

            let check_box = document.getElementById(element.props.children.props.id);
            if (check_box.checked){
                data["thumbnail"] = selectedFile;
            }else{
                data["image-" + fileObjIndex] = selectedFile;
            }
          });

          console.log(data);

          api.post("api/admin/house/update", data, {headers: {"Content-Type": "multipart/form-data"}}).then(response => {
              if (response.status === 200){
                  const data = response.data;
                  if (data.status == "ok"){
                      bedroomCount.value = "";
                      bathRoomCount.value = "";
                      garageCount.value = "";
                      floorCount.value = "";
                      areaCount.value = "";
                      priceCount.value = "";
                      // description.value = "";
                      address.value = "";
                      setUpdateHomeVisibility(false);
                      // city.value = ""
                      // country.value = ""
                  }
              }
          });
        }
    };

    useEffect(() => {
      if (isLoggedIn()){
          getCountries(setCountries);
      }
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            getHouseList();
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    
  return (
    <div className="col-12">
      <div className="d-flex position-fixed align-items-center justify-content-center" 
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

              const filtersContainer = document.getElementById("filters-container");

              if (expandFilter){
                filtersContainer.classList.add("scale-up");
              }else{
                filtersContainer.classList.remove("scale-up");
              }
          }}>
              {!expandFilter ? <Filter className="text-white fs-1 fw-bolder" /> : <X className="text-white fs-1 fw-bolder" /> }
      </div>
      <div className={(expandFilter ? "d-flex" : "d-none" ) + " bg-white col-2 rounded-3 pt-4 ps-4 pe-4 pb-3 d-flex flex-column gap-2 position-fixed top-5 vh-75 z-3 ms-5 mt-3 filters-container"} id="filters-container" style={{backgroundColor: "#00000005", boxShadow: "0px 0px 10px 1px #000"}}>
        <div className="row">
            <input className="form-control" placeholder="search" id="search"/>
        </div>
        <div className="row">
            <button className="btn btn-primary">Search</button>
        </div>
        <div className="row">
            <select className="form-select" id="property-type" defaultValue={"house"} onChange={applyFilter}>
                <option>Select Type</option>
                <option value={"house"}>House</option>
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
                        <label>Min</label>
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

      <DeleteConfirmationDialog content="Are you sure you want to delete the property and all data associated with it?" visible={showHouseDeleteConfirmation} setVisibility={setShowHouseDeleteConfirmation} onDelete={() => {
        api.post("api/admin/house/delete", {id: selectedHouseID}).then(response => {
          if (response.status === 200){
            const data = response.data;
            if (data.status == "ok"){
              alert("House deleted successfully!");
            }
          }
        });
      }}></DeleteConfirmationDialog>

      <div className="row">

        <ListHouseForm visible={homeDialogVisibility} setVisibility={setHomeDialogVisibility}/>

        <div className="col-12">
          <div className="row align-items-end justify-content-start gap-3">
            <div className="col-3 ps-0 pe-0">
              <div className="row justify-content-center ps-3">
                <button
                  className="btn btn-primary fw-bolder w-auto"
                  onClick={() => {
                    setHomeDialogVisibility(!homeDialogVisibility);
                  }}
                >
                  <Plus className="fs-5" />
                  List a Home
                </button>
              </div>
            </div>
            
            <div className="col-8 d-flex flex-row justify-content-start">
              <input
                type="text"
                placeholder="Enter address, city, country or state"
                className="form-control text-black ms-5"
              />
            </div>

            {/* <div className="col-2 d-flex flex-column">
              <div className="row d-flex flex-row">
                <span className="fw-bold">Filter by</span>
                <select className="form-control">
                  <option>-- select --</option>
                  <option value={"address"}>Address</option>
                  <option value={"country"}>Country</option>
                  <option value={"city"}>City</option>
                  <option value={"bath-count"}>Bathroom Count</option>
                  <option value={"bed-count"}>Bedroom Count</option>
                  <option value={"garage-count"}>Garage Count</option>
                  <option value={"floors-count"}>Floors Count</option>
                </select>
              </div>
            </div> */}
          </div>
          <div className="row gap-0 pt-5 ps-3">
            <CustomDialog visible={updateHomeVisibility} index={6000}>
              <div className="row d-flex justify-content-center pt-4 ps-5">
                <div className="col-12">
                  <div className="row d-flex justify-content-start align-items-center gap-5">
                    <div className="col-6 fs-2 text-white">
                      Update Property Data
                    </div>
                    <div className="col-5">
                      <div className="row gap-3 justify-content-end">
                        <div className="col-3">
                          <div className="row">
                            <button
                              className="btn close-btn"
                              onClick={() => {
                                // document.getElementById("dialog").classList.replace("d-flex", "d-none");
                                setUpdateHomeVisibility(false);
                              }}
                            >close</button>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="row">
                            <button
                                  className="btn btn-primary w-100"
                                  onClick={() => {
                                    updateHouse();
                                  }}
                                >
                                Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-3 gap-4">
                    <div className="col-5">
                      <div className="row">
                        <div className="col-6">
                          <label className="text-white ps-0 pt-2">
                            Bedroom count
                          </label>
                          <input
                            type="number"
                            className="form-control bg-transparent border-white"
                            id="number-of-bedrooms-update"
                          />
                        </div>
                        <div className="col-6">
                          <label className="text-white ps-0 pt-2">
                            Bathroom count
                          </label>
                          <input
                            type="number"
                            className="form-control bg-transparent border-white"
                            id="number-of-bathrooms-update"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label className="text-white ps-0 pt-2">
                            Garage count
                          </label>
                          <input
                            type="number"
                            className="form-control bg-transparent border-white"
                            id="number-of-garages-update"
                          />
                        </div>
                        <div className="col-6">
                          <label className="text-white ps-0 pt-2">
                            Floor count
                          </label>
                          <input
                            type="number"
                            className="form-control bg-transparent border-white"
                            id="number-of-floors-update"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label className="text-white ps-0 pt-2">Area</label>
                          <input
                            type="number"
                            className="form-control bg-transparent border-white"
                            id="area-update"
                          />
                        </div>
                        <div className="col-6">
                          <label className="text-white ps-0 pt-2">Price</label>
                          <input
                            type="number"
                            className="form-control bg-transparent border-white"
                            id="price-update"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label className="text-white pt-2">Address</label>
                          <input
                            type="text"
                            className="form-control bg-transparent border-white"
                            id="address-update"
                          />
                        </div>
                      </div>
                      <div className="row py-2">
                        <Col xs={12} md={4}>
                          <select
                            className="form-select"
                            id="country-update"
                            onChange={(event) => {
                              getStates(event.target.value);
                            }}
                          >
                            <option>Select your country</option>
                            {countries}
                          </select>
                        </Col>
                        <Col xs={12} md={4}>
                          <select className="form-select" id="state-update" onChange={(event) => {
                            getCities(event.target.value)
                          }}>
                            <option>Select your state</option>
                            {states}
                          </select>
                        </Col>
                        <Col xs={12} md={4}>
                          <select className="form-select" id="city-update">
                            <option>Select your city</option>
                            {cities}
                          </select>
                        </Col>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label
                            for="file-selector-update"
                            className="p-2 rounded-2 bg-primary text-white d-flex justify-content-center align-items-center"
                          >
                            Choose Images
                          </label>
                          <input
                            type="file"
                            id="file-selector-update"
                            multiple
                            hidden
                            onChange={() => {
                              prepareSelectedFiles(true);
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div
                            className="row mx-1 d-flex flex-row flex-nowrap align-items-center image-container gap-3"
                            style={{ height: "180px" }}
                          >
                            {selectedImagesForUpdate}
                          </div>
                        </div>
                      </div>
                      {/* <div className="row">
                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => {
                              updateHouse();
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div> */}
                    </div>
                    <div className="col-3 text-white">
                      <SelectAgent
                        visible={selectAgentVisibilityRef.current}
                        setVisible={setSelectAgentVisibilityRef}
                        setAgentInformation={setSelectedAgentInformationRef}
                      />
                      <div className="row">
                        <div className="col-6">Assigned Agent:</div>
                        <div className="col-6" id="agent-name">{selectedAgentInformation["name"] != null ? selectedAgentInformation["name"] : ""}</div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-12">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setSelectAgentVisibilityRef(true);
                              // alert(selectAgentVisibility);
                            }}
                          >
                            CHANGE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CustomDialog>
            <div className="col-12 ps-4">
              <div className="row gap-3 ps-3">{houses}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
