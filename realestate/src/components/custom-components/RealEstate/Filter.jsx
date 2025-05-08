import { useEffect, useState } from "react";

export default function Filter(props){
    const [components, setComponents] = useState(null);
    const [data, setData] = useState({});

    const filterResult = () => {

    }

    useEffect(() => {
        if (props.type == "house"){
            setData(props.data);
            setComponents(
                
                
                );
        }else{
            setComponents(<></>);
        }
    }, []);


    return (
        <div className="row vh-100 overflow-y-scroll">
            <div className="col-12 fs-5 fw-bold">
                Filters
            </div>
            {props.children}

            <div className="col-12 pt-3">
                <div className="row">
                    <div className="col-12 d-flex flex-column gap-2">
                        <button className="btn btn-primary" onClick={() => {

                            const inputFields = document.getElementsByName("filter-field");
                            const data = {};
                            let filterString = "?";

                            inputFields.forEach(element => {
                                console.dir(element);
                                const id = element.id;
                                if (element.type == "checkbox"){
                                    if (element.checked){
                                        data[id] = element.checked;
                                        filterString += id + "=" + element.checked + "&";
                                    }
                                }else{
                                    data[id] = element.value;
                                    if (element.value != "" && element.value != undefined && element.value != null){
                                        filterString += id + "=" + element.value + "&";
                                    }
                                }
                            });

                            filterString = filterString.substring(0, filterString.length - 2)
                            console.log(filterString);
                            alert(filterString);
                            

                            // {
                            //     "country-filter": "",
                            //     "city-filter": "",
                            //     "sqft": "on",
                            //     "sqmt": "on",
                            //     "acres": "on",
                            //     "min-area-filter": "50",
                            //     "max-area-filter": "50",
                            //     "min-price-filter": "50",
                            //     "max-price-filter": "50",
                            //     "latitude-filter": "",
                            //     "longitude-filter": "",
                            //     "available-by-filter": ""
                            // }

                            // const country = document.getElementById("country-filter").value;
                            // const city = document.getElementById("city-filter").value;
                            // const areaMeasurementType = document.getElementById("area-measurement-unit-filter").value;
                            // const minArea = document.getElementById("min-area-filter").value;
                            // const maxArea = document.getElementById("max-area-filter").value;
                            // const minPrice = document.getElementById("min-price-filter").value;
                            // const maxPrice = document.getElementById("max-price-filter").value;
                            // const latitude = document.getElementById("latitude-filter").value;
                            // const longitude = document.getElementById("longitude-filter").value;
                            // const status = document.getElementById("status-filter").value;
                            // const availableBy = document.getElementById("available-by-filter").value;

                            // const filterData = {
                            //     country: country,
                            //     city: city,
                            //     amt: areaMeasurementType,
                            //     minArea: minArea,
                            //     maxArea: maxArea,
                            //     minPrice: minPrice,
                            //     maxPrice: maxPrice,
                            //     lat: latitude,
                            //     long: longitude,
                            //     stat: status,
                            //     ab: availableBy
                            // };

                            // if (props.type == "house"){
                            //     filterData["bedRC"] = document.getElementById("bed-room-count-filter").value,
                            //     filterData["bathRC"] = document.getElementById("bath-room-count-filter").value,
                            //     filterData["floorCount"] = document.getElementById("floors-count-filter").value,
                            //     filterData["garageCount"] = document.getElementById("garages-count-filter").value
                            // }

                            // let filterString = "?";
                            // const keys = Object.keys(filterData);
                            // keys.forEach(key => {
                            //     filterString += key + "=" + filterData[key];

                            //     if (key != keys[keys.length - 1]){
                            //         filterString = "&"
                            //     }
                            // });

                            props.setFilter(filterString);
                        }}>Apply Filters</button>
                        <button className="btn btn-outline-dark" onClick={() => {
                            props.setFilter("");
                        }}>Clear Filters</button>
                    </div>
                </div>
            </div>
        </div>
    );
}