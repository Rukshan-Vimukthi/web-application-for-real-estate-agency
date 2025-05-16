import Dialog from "../Dialog";
import { useEffect, useRef, useState } from "react";
import api from "../../../api/api";
import { Col, Row } from "react-bootstrap";
import SelectedImagePreview from "../../bininstructions-components/Controls/SelectedImagePreview";
import { Trash3Fill } from "react-bootstrap-icons";


export default function HouseUpdateDialog(props){
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [currentCountry, setCurrentCountry] = useState('');
    const [currentState, setCurrentState] = useState('');
    const [currentCity, setCurrentCity] = useState('');

    const [uploadedImages, setUploadedImages] = useState([]);

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

    const getStates = (countryID) => {
        api.post("/api/v1/state-list", {id: countryID}).then(response => {
            if (response.status === 200){
                const data = response.data.data;
                const stateList = [];
                data.forEach(element => {
                    if (element.id == props.houseData.state.id){
                        getCities(props.houseData.state.id);
                    }
                    stateList.push(<option value={element.id} >{element.name}</option>);
                });
  
                setStates(data => {
                    return stateList;
                })
            }
        });
    }

    const getCountries = () => {
        api.get("/api/v1/country-list").then(response => {
            if (response.status === 200){
                const data = response.data.data;
                const countryList = [];
                data.forEach(element => {
                    // alert(element.id === props.houseData.country.id, props.houseData.country.name);
                    if (element.id == props.houseData?.country.id){
                        // alert("Getting states of country " + props.houseData.country.id)
                        getStates(props.houseData.country.id);
                    }
                    countryList.push(<option value={element.id}>{element.name}</option>);
                });
                setCountries(data => {
                    return countryList;
                });
            }
        });
    };

    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const houseDescription = useRef();

    const updateHouse = async() => {
      let numberOfBedrooms = document.getElementById("number-of-bedrooms-update").value;
      let numberOfBathrooms = document.getElementById("number-of-bathrooms-update").value;
      let numberOfGarages = document.getElementById("number-of-garages-update").value;
      let numberOfFloors = document.getElementById("number-of-floors-update").value;
      let area = document.getElementById("area-update").value;
      let street = document.getElementById("street-update").value;
      let price = document.getElementById("price-update").value; 
      let yearBuilt = document.getElementById("year-built-update").value; 
      let cooling = document.getElementById("cooling-update").value; 
      let heating = document.getElementById("heating-update").value;
      let description = houseDescription.current.value;
      let title = document.getElementById("title-update").value; ;

      let country = document.getElementById("country-update").value;
      let state = document.getElementById("state-update").value;
      let city = document.getElementById("city-update").value;

      // let selectedImages = Object.values(document.getElementsByName("selected-image"));
      let selectedMediaFiles = document.getElementById("file-selector-update").files;

      const uploadData = {
        houseID: props.houseData.houseId,
        bedRoomCount: numberOfBedrooms,
        bathRoomCount: numberOfBathrooms,
        garageCount: numberOfGarages,
        floorCount: numberOfFloors,
        area: area,
        street: street,
        country: country,
        state: state,
        city: city,
        price: price,
        yearBuilt: yearBuilt,
        cooling: cooling,
        heating: heating,
        description: description,
        title: title
      }

      if (imagesToDelete.length != 0){
        uploadData["imagesToDelete"] = imagesToDelete
      }

      let check_boxes = document.getElementsByName("is_thumbnail");
      console.log(check_boxes);
      check_boxes.forEach(element => {
        let fileObjIndex = Number.parseInt(element.id.split("selected-media-radio-selected-house-image-")[1]);
        
        let dataField = document.getElementById("selected-media-selected-house-image-" + fileObjIndex);
        console.log(dataField);
        if (!dataField){
            dataField = document.getElementById("selected-media-id-selected-house-image-" + fileObjIndex);
        }
        console.log(dataField, "latest");
        
        let value = null;
        
        if(dataField.type == "file"){
            value = dataField.files[0];
        }else if(dataField.type == "text"){
            value = dataField.value;
        }

        if (element.checked){
            uploadData["thumbnail"] = value;
        }else{
            console.log(typeof(value))
            if(typeof(value) == "object"){
                uploadData["image-" + fileObjIndex] = value;
            }
        }
        // let selectedFile = selectedMediaFiles[fileObjIndex];
      });

    //   console.log(uploadData);

      const response = await api.post("api/admin/house/update", uploadData, {headers: {"Content-Type": "multipart/form-data"}});
      if (response.status === 200){
          const data = response.data;
          if (data.status == "ok"){
            props.setVisible(false);
            setUploadedImages([]);
            setSelectedImages([]);
            setImagesToDelete([]);
            alert("House updated!");
          }
      }
    }

    const prepareSelectedFiles = () => {
        const fileChooser = document.getElementById("file-selector-update");
        const files = fileChooser.files;
        console.log(files);
        const imagePreviewComponents = [];

        for (let i = 0; i < files.length; i++){
            let file = URL.createObjectURL(files[i]);
            const selectedImageObj = {
                image: file,
                file: files[i],
                id: "selected-house-image-" + (uploadedImages.length + 1 + i)
            }
            imagePreviewComponents.push(selectedImageObj);
        }
        setSelectedImages(imagePreviewComponents);
    }


    const prepareUploadedImages = () => {
        setUploadedImages(props.houseData?.media);
    }

    const deleteUploadedImage = (uploadedImageData) => {
        setUploadedImages(uploadedImages.filter(item => item.mediaId != uploadedImageData.mediaId));
    }

    useEffect(() => {
      getCountries();
      prepareUploadedImages();

      setCurrentCountry(props.houseData?.country.id);
      setCurrentState(props.houseData?.state.id);
      setCurrentCity(props.houseData?.city.id);
    }, [props.houseData]);

    return (
        <Dialog 
        title={"Update House"} 
        backgroundColor="#EEF" 
        visible={props.visible} 
        setVisible={props.setVisible}
        xs={10}
        >
            <Col xs={12}>
                <Row>
                    <Col xs={12} md={7}>
                        <Row>
                            <Col xs={12}>
                                <label className="">Title</label>
                                <input 
                                type="text" 
                                className="form-control text-black bg-white" 
                                id="title-update"
                                defaultValue={props.houseData?.title}/>
                            </Col>
                        </Row>
                        <Row className="">
                            <Col xs={12} md={4} xl={3} className="">
                            <label className=" ps-0 pt-2">Bedroom count</label>
                            <input
                                type="number"
                                className="form-control text-black bg-white"
                                id="number-of-bedrooms-update"
                                defaultValue={props.houseData?.numberOfBedrooms}
                            />
                            </Col>
                            <Col xs={12} md={4} xl={3} className="">
                            <label className=" ps-0 pt-2">Bathroom count</label>
                            <input
                                type="number"
                                className="form-control text-black bg-white"
                                id="number-of-bathrooms-update"
                                defaultValue={props.houseData?.numberOfBathrooms}
                            />
                            </Col>
                            <Col xs={12} md={4} xl={2} className="">
                            <label className=" ps-0 pt-2">Garage count</label>
                            <input
                                type="number"
                                className="form-control text-black bg-white"
                                id="number-of-garages-update"
                                defaultValue={props.houseData?.numberOfGarages}
                            />
                            </Col>
                            <Col xs={12} md={3} xl={2} className="">
                            <label className=" ps-0 pt-2">Floor count</label>
                            <input
                                type="number"
                                className="form-control text-black bg-white"
                                id="number-of-floors-update"
                                defaultValue={props.houseData?.numberOfFloors}
                            />
                            </Col>
                            <Col xs={12} md={3} xl={2} className="">
                            <label className=" ps-0 pt-2">Area</label>
                            <input
                                type="number"
                                className="form-control text-black bg-white"
                                id="area-update"
                                defaultValue={props.houseData?.area}
                            />
                            </Col>
                            <Col xs={12} md={3} xl={2} className="">
                            <label className=" ps-0 pt-2">Price</label>
                            <input
                                type="number"
                                className="form-control text-black bg-white"
                                id="price-update"
                                defaultValue={props.houseData?.price}
                            />
                            </Col>

                            <Col xs={12} md={3} xl={2} className="">
                            <label className=" ps-0 pt-2">Year Built</label>
                            <input
                                type="text"
                                className="form-control text-black bg-white"
                                id="year-built-update"
                                defaultValue={props.houseData?.yearBuilt}
                            />
                            </Col>

                            <Col xs={12} md={3} xl={4} className="">
                            <label className=" ps-0 pt-2">Cooling</label>
                            <input
                                type="text"
                                className="form-control text-black bg-white"
                                id="cooling-update"
                                defaultValue={props.houseData?.cooling}
                            />
                            </Col>

                            <Col xs={12} md={3} xl={4} className="">
                            <label className=" ps-0 pt-2">Heating</label>
                            <input
                                type="text"
                                className="form-control text-black bg-white"
                                id="heating-update"
                                defaultValue={props.houseData?.heating}
                            />
                            </Col>

                            <Col xs={12} md={3} className="pt-4 mt-2">
                            <select
                                className="form-select"
                                name="select-country"
                                key={"select-country"}
                                value={`${currentCountry}`}
                                id="country-update"
                                onChange={(event) => {
                                getStates(event.target.value);
                                }}
                            >
                                <option>country</option>
                                {countries}
                            </select>
                            </Col>

                            <Col xs={12} md={3} className="pt-4 mt-2">
                            <select
                                className="form-select"
                                name="select-state"
                                key={"select-state"}
                                value={`${currentState}`}
                                id="state-update"
                                onChange={(event) => {
                                getCities(event.target.value);
                                }}
                            >
                                <option>Select your state</option>
                                {states}
                            </select>
                            </Col>

                            <Col xs={12} md={3} className="pt-4 mt-2">
                            <select 
                            className="form-select" 
                            name="select-city"
                            key={"select-city"}
                            value={`${currentCity}`}
                            id="city-update">
                                <option>Select your city</option>
                                {cities}
                            </select>
                            </Col>

                        </Row>
                        <Row className="">
                            <div className="col-8">
                            <label className=" pt-2">street</label>
                            <input
                                type="text"
                                className="form-control text-black bg-white"
                                id="street-update"
                                defaultValue={props.houseData?.street}
                            />
                            </div>

                            <Col xs={4} className="pb-2">
                                <label className="  pt-2">Zip Code</label>
                                <input 
                                type="text" 
                                className="form-control text-black bg-white" 
                                id="zip-code-update" 
                                defaultValue={props.houseData?.zipCode}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <textarea 
                                className="form-control text-black" 
                                defaultValue={props.houseData?.description} 
                                ref={houseDescription} rows={3} placeholder="Description">
                                </textarea>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={5}>
                        <Row className="">
                            <div className="col-12">
                            <label
                                htmlFor="file-selector-update"
                                className="p-2 rounded-2 bg-primary  d-flex justify-content-center align-items-center"
                            >
                                Choose Images
                            </label>
                            <input
                                type="file"
                                id="file-selector-update"
                                multiple
                                hidden 
                                onChange={(event) => {
                                    prepareSelectedFiles();
                                    // console.log("Files selected.")
                                }}
                            />
                            </div>
                        </Row>
                        <Row className="gap-2 overflow-x-scroll flex-nowrap" style={{ height: "180px" }}>
                            {
                            selectedImages.map(item => {
                                return (
                                <SelectedImagePreview 
                                    image={item.image} 
                                    file={item.file}
                                    id={item.id}
                                    onDelete={() => {
                                        setSelectedImages(selectedImages.filter(element => element.id != item.id));
                                    }}
                                    />
                                );
                            })
                            }
                        </Row>
                        <Row className="gap-2 overflow-x-scroll flex-nowrap" style={{ height: "180px" }}>
                            {
                                uploadedImages?.map(mediaElement => {
                                    // alert(mediaElement.mediaPath);
                                    return (
                                        <SelectedImagePreview 
                                        image={mediaElement.mediaPath} 
                                        imageID={mediaElement.mediaId}
                                        id={"selected-house-image-" + (uploadedImages.indexOf(mediaElement))} 
                                        isThumbnail={mediaElement.isThumbnail}
                                        onDelete={() => {
                                            deleteUploadedImage(mediaElement);
                                            setImagesToDelete(data => {
                                                console.log(data);
                                                if(data.length != 0){
                                                    return [...data, mediaElement.mediaId];
                                                }
                                                return [mediaElement.mediaId];
                                            });
                                        }}
                                        />
                                        // <div className="d-flex flex-column gap-2" key={mediaElement?.mediaId}
                                        // style={
                                        //         {
                                        //             width: "150px",
                                        //             height: "150px"
                                        //         }
                                        //     }
                                        // >
                                        //     <div className="d-flex gap-2">
                                        //         <span style={{fontSize: "12px"}}>Set as Thumbnail</span>
                                        //         <input key={"update-thumbnail-checkbox-" + mediaElement?.mediaId} type="radio" name="update-image-thumbnail" defaultChecked={mediaElement?.isThumbnail} />
                                        //     </div>
                                        //     <div style={
                                        //         {
                                        //             backgroundImage: `url(${mediaElement?.mediaPath})`,
                                        //             width: "150px",
                                        //             height: "100px",
                                        //             backgroundSize: "cover",
                                        //             backgroundRepeat: "no-repeat"
                                        //         }
                                        //     }>
                                        //     </div>
                                        //     <button 
                                        //         className="btn pt-1 btn-danger d-flex gap-2"
                                        //         onClick={() => {
                                        //             setImagesToDelete(data => {
                                        //                 return [...data, mediaElement?.mediaId];
                                        //             });

                                        //             setUploadedImages(data => {
                                        //                 return data.filter(element => element.mediaId !== mediaElement?.mediaId)
                                        //             });
                                        //         }}
                                        //         >
                                        //         <Trash3Fill size={22}/>Delete
                                        //     </button>
                                        // </div>
                                    );
                                })
                            }
                        </Row>
                    </Col>
                </Row>
                <Row className=" pt-2 justify-content-end gap-2">
                    <button
                        className="btn btn-primary w-auto"
                        onClick={() => {
                            updateHouse();
                        }}
                    >
                        UPDATE
                    </button>
                        <button
                            className="btn btn-danger w-auto"
                            onClick={() => {
                                props.setVisible(false);
                            }}
                        >
                            DISCARD
                        </button>
                </Row>
            </Col>
        </Dialog>
    );
}