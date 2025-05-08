import { XSquare } from "react-bootstrap-icons";
import './css/style.css'

export default function Dialog(props){
    let visibleClass = "d-none";

    if (props.visible){
        visibleClass = "d-flex"
    }

    return (
        <div id="dialog" className={visibleClass + " flex-column container-fluid position-fixed top-0 start-0 vh-100 vw-100 bg-black overflow-y-scroll pb-5"} style={{scrollbarColor: "transparent transparent", zIndex: 5000}}>
            <div className="row d-flex justify-content-center pt-5">
                <div className="col-5 pt-4">
                    <div className="row d-flex justify-content-end align-items-center">
                        <div className="col-11 fs-2 " style={{color: props.titleColor ? props.titleColor : "#FFF"}}>
                            {props.title}
                        </div>
                        <div className="col-1">
                            <XSquare className="dialog-close-btn" onClick={() => {
                                // document.getElementById("dialog").classList.replace("d-flex", "d-none");
                                props.setVisibility(false);
                            }}/>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-12 d-flex flex-column gap-2">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}