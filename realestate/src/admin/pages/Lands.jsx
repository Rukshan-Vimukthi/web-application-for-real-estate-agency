import { Plus } from "react-bootstrap-icons";
import Filter from "../../components/custom-components/RealEstate/Filter";
import { useEffect, useState } from "react";

export default function Lands(){
    const [filterString, setFilterString] = useState();

    const getLands = () => {

    };

    useEffect(() => {
        const interval = setInterval(() => {
            getLands();
        }, 1200);
        return () => clearInterval(interval);
    });

    return (
        <>
        <div className="col-12">
            <div className="row">
                <div className="col-2 px-0">
                    {/* <Filter type="land" setFilter={setFilterString}/> */}
                </div>
                <div className="col-9 px-4">
                    <div className="row">
                        <div className="col-3 p-0 d-flex justify-content-center">
                            <button className="btn btn-primary d-flex align-items-center fw-bolder"><Plus className="fs-3"/>List a Land</button>
                        </div>
                        <div className="col-8 d-flex flex-row justify-content-start">
                            <input
                                type="text"
                                placeholder="Enter address, city, country or state"
                                className="form-control text-black ms-5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}