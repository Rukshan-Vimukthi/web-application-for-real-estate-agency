import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import Dialog from "../bininstructions-components/Windows/Dialog";
import { Col, Row } from "react-bootstrap";
import SelectedImagePreview from "../bininstructions-components/Controls/SelectedImagePreview.jsx";
import houseData from "../../admin/pages/house-example.json";

export default function ListHouseForm(props){
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

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

    const [selectedImages, setSelectedImages] = useState([]);
    const houseDescription = useRef();
    const registerHouse = async() => {
      let numberOfBedrooms = document.getElementById("number-of-bedrooms").value;
      let numberOfBathrooms = document.getElementById("number-of-bathrooms").value;
      let numberOfGarages = document.getElementById("number-of-garages").value;
      let numberOfFloors = document.getElementById("number-of-floors").value;
      let area = document.getElementById("area").value;
      let street = document.getElementById("street").value;
      let price = document.getElementById("price").value; 
      let yearBuilt = document.getElementById("year-built").value; 
      let cooling = document.getElementById("cooling").value; 
      let heating = document.getElementById("heating").value;
      let description = houseDescription.current.value;
      let title = document.getElementById("title").value; ;

      let country = document.getElementById("country").value;
      let state = document.getElementById("state").value;
      let city = document.getElementById("city").value;

      // let selectedImages = Object.values(document.getElementsByName("selected-image"));
      let selectedMediaFiles = document.getElementById("file-selector").files;

      const uploadData = {
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

      console.log(selectedImages);

      let check_boxes = document.getElementsByName("is_thumbnail");
      check_boxes.forEach(element => {
          let fileObjIndex = Number.parseInt(element.id.split("selected-house-image-")[1]);
          let selectedFile = selectedMediaFiles[fileObjIndex];
          if (element.checked){
            uploadData["thumbnail"] = selectedFile;
          }else{
            uploadData["image-" + fileObjIndex] = selectedFile;
          }
      });

      // selectedImages.forEach(element => {
      //     let element_name = element.name;
      //     let fileObjIndex = Number.parseInt(element.id.split("selected-house-image-")[1]);

      //     let selectedFile = selectedMediaFiles[fileObjIndex];
      //     let check_box = document.getElementById("selected-house-image-" + fileObjIndex);
      //     if (check_box.checked){
      //         uploadData["thumbnail"] = selectedFile;
      //     }else{
      //         uploadData["image-" + fileObjIndex] = selectedFile;
      //     }
      // });


      const response = await api.post("api/v1/houses/register", uploadData, {headers: {"Content-Type": "multipart/form-data"}});
      if (response.status === 200){
          const data = response.data;
          if (data.status == "ok"){
            props.setVisibility(false);
            alert("House registered!");
          }
      }
    }

    const prepareSelectedFiles = async (isUpdate) => {
      if (!isUpdate){
          const fileChooser = document.getElementById("file-selector");
          const files = fileChooser.files;

          const imagePreviewComponents = [];

          for (let i = 0; i < files.length; i++){
              let file = URL.createObjectURL(files[i]);
              imagePreviewComponents.push(<div className="col-4"><SelectedImagePreview image={file} id={"selected-house-image-" + i}/></div>);
          }
          setSelectedImages(imagePreviewComponents);
      }else{
          const fileChooser = document.getElementById("file-selector-update");
          const files = fileChooser.files;

          const imagePreviewComponents = [];

          for (let i = 0; i < files.length; i++){
              let file = URL.createObjectURL(files[i]);
              imagePreviewComponents.push(<div className="col-4"><SelectedImagePreview image={file} id={"selected-house-image-update-" + i}/></div>);
          }
          console.log("Selected Images for update: ", imagePreviewComponents);
          setSelectedImagesForUpdate(imagePreviewComponents);
      }
    }


    useEffect(() => {
      getCountries();
    }, []);

    return (
        <Dialog
          title="Home listing form"
          visible={props.visible}
          setVisibility={props.setVisibility}>
            <Row>
              <Col xs={12}>
                <label className="text-white">Title</label>
                <input type="text" className="form-control" defaultValue={houseData.title}/>
              </Col>
            </Row>
          <Row className="">
            <Col xs={12} md={4} xl={3} className="">
              <label className="text-white ps-0 pt-2">Bedroom count</label>
              <input
                type="number"
                className="form-control bg-transparent border-white"
                id="number-of-bedrooms"
                defaultValue={houseData.bedrooms}
              />
            </Col>
            <Col xs={12} md={4} xl={3} className="">
              <label className="text-white ps-0 pt-2">Bathroom count</label>
              <input
                type="number"
                className="form-control bg-transparent border-white"
                id="number-of-bathrooms"
                defaultValue={houseData.bathrooms}
              />
            </Col>
            <Col xs={12} md={4} xl={2} className="">
              <label className="text-white ps-0 pt-2">Garage count</label>
              <input
                type="number"
                className="form-control bg-transparent border-white"
                id="number-of-garages"
                defaultValue={2}
              />
            </Col>
            <Col xs={12} md={3} xl={2} className="">
              <label className="text-white ps-0 pt-2">Floor count</label>
              <input
                type="number"
                className="form-control bg-transparent border-white"
                id="number-of-floors"
                defaultValue={1}
              />
            </Col>
            <Col xs={12} md={3} xl={2} className="">
              <label className="text-white ps-0 pt-2">Area</label>
              <input
                type="number"
                className="form-control bg-transparent border-white"
                id="area"
                defaultValue={houseData.area_sqft}
              />
            </Col>
            <Col xs={12} md={3} xl={2} className="">
              <label className="text-white ps-0 pt-2">Price</label>
              <input
                type="number"
                className="form-control bg-transparent border-white"
                id="price"
                defaultValue={houseData.price}
              />
            </Col>

            <Col xs={12} md={3} xl={2} className="">
              <label className="text-white ps-0 pt-2">Year Built</label>
              <input
                type="text"
                className="form-control bg-transparent border-white"
                id="year-built"
                defaultValue={houseData.year_built}
              />
            </Col>

            <Col xs={12} md={3} xl={4} className="">
              <label className="text-white ps-0 pt-2">Cooling</label>
              <input
                type="text"
                className="form-control bg-transparent border-white"
                id="cooling"
                defaultValue={houseData.cooling}
              />
            </Col>

            <Col xs={12} md={3} xl={4} className="">
              <label className="text-white ps-0 pt-2">Heating</label>
              <input
                type="text"
                className="form-control bg-transparent border-white"
                id="heating"
                defaultValue={houseData.heating}
              />
            </Col>

            <Col xs={12} md={3} className="pt-4 mt-2">
              <select
                className="form-select"
                id="country"
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
                id="state"
                onChange={(event) => {
                  getCities(event.target.value);
                }}
              >
                <option>Select your state</option>
                {states}
              </select>
            </Col>

            <Col xs={12} md={3} className="pt-4 mt-2">
              <select className="form-select" id="city">
                <option>Select your city</option>
                {cities}
              </select>
            </Col>

          </Row>
          <Row className="">
            <div className="col-8">
              <label className="text-white pt-2">street</label>
              <input
                type="text"
                className="form-control bg-transparent border-white"
                id="street"
                defaultValue={houseData.address.street}
              />
            </div>

            <Col xs={4}>
              <label className=" text-white pt-2">Zip Code</label>
              <input type="text" className="form-control" id="zip-code" defaultValue={houseData.address.zip_code}/>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <textarea className="form-control" defaultValue={houseData.description} ref={houseDescription} rows={3} placeholder="Description">
              </textarea>
            </Col>
          </Row>
          
          <Row className="">
            <div className="col-12">
              <label
                for="file-selector"
                className="p-2 rounded-2 bg-primary text-white d-flex justify-content-center align-items-center"
              >
                Choose Images
              </label>
              <input
                type="file"
                id="file-selector"
                multiple
                hidden
                onChange={() => {
                  prepareSelectedFiles(false);
                }}
              />
            </div>
          </Row>
          <Row className="">
            <div className="col-12">
              <div
                className="row mx-1 d-flex flex-row flex-nowrap align-items-center image-container gap-3"
                style={{ height: "180px" }}
              >
                {selectedImages}
              </div>
            </div>
          </Row>
          <Row className="">
            <div className="col-12">
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  registerHouse();
                }}
              >
                Register
              </button>
            </div>
          </Row>
        </Dialog>
    );
}