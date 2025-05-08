import "./components.css";

import 'react-bootstrap-icons'
import { useEffect, useState } from "react";


export function TabItem(props){
    return (
        <div className="row align-items-center tab-item" style={{height: "50px", color: props.active ? "#0055FF" : "#FFFFFF"}} id={props.id} onClick={() => {
            let contentLabel = props.id + "-content";
            let content = document.getElementById(contentLabel);

            let childItems = document.getElementById(props.id).parentElement.children;
            // console.log(childItems);
            for(let i = 0; i < childItems.length; i++){
                let element = childItems[i];
                console.log(element);
                if (element.id == props.id){
                    element.style.color = "#0055FF";
                }else{
                    element.style.color = "#FFFFFF";
                }
            };

            let contents = content.parentNode.childNodes;

            contents.forEach(element => {
                element.classList.replace("d-flex", "d-none");
            });

            let classNames = content.classList;
            if (classNames.contains("d-none")){
                content.classList.replace("d-none", "d-flex");
            }
        }}>
            <div className="col-2">
                {props.icon == undefined ? '' : props.icon}
            </div>
            <div className="col-10">
                {props.title}
            </div>
        </div>
    )
}

export function TabContent(props){
    return (
        <div className={"row vh-100 p-3 " + (props.active ? "d-flex" : "d-none")} id={props.for + "-content"}>
            {props.children}
        </div>
    )
}

export function TabView(props){
    return (
        <>
        {props.tabAlignment == "left" ?
        <div className="row">
            <div className="col-2 bg-black vh-100">
            {props.children[0]}
            </div>
            <div className="col-10 vh-100">
            {props.children[1]}
            </div>
        </div>
        :
        <div className="row">
            <div className="col-12">
                <div className="row">

                </div>
                <div className="row">

                </div>
            </div>
        </div>
        }
        </>
    );
}


export function SelectedImagePreview(props){
    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div style={{width: "200px", height: "120px", backgroundImage: `url('${props.image}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                    </div>
                </div>
                <div className="row text-white justify-content-center">
                    <div className="col-1">
                        <input type="checkbox" id={props.id} className=" form-check-input" name="selected-image" onChange={(event) => {
                            console.log(event);
                            const element = event.target;
                            const elements = document.getElementsByName("selected-image");
                            elements.forEach((component) => {
                                if (component != element){
                                    component.checked = false;
                                }
                            });
                        }}/>
                    </div>
                    <div className="col-10">
                        <label>Set as Thumbnail</label>
                    </div>
                </div>
            </div>
        </div>
    );
}


export function ProductCard(props){
    const [images, setImages] = useState(null);

    useEffect(() => {
        const imageControls = props.images.map(image => {
            return image;
        });
        setImages(imageControls);
    }, []);

    return (
        <div className="row">
            <div className="col-12">
                <div className="row">{props.title}</div>
                <div className="row">{images}</div>
            </div>
        </div>
    );
}


export function CustomDialog(props){
    let visibleClass = "d-none";

    if (props.visible){
        visibleClass = "d-flex"
    }

    return (
        <div id="dialog" className={visibleClass + " flex-column container-fluid position-fixed top-0 start-0 vh-100 vw-100 bg-black overflow-y-scroll pb-5"} style={{scrollbarColor: "transparent transparent", zIndex: props.index}}>
            {props.children}
        </div>
    );
}