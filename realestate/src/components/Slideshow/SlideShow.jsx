import { ArrowLeftSquare, ArrowLeftSquareFill, ArrowRightSquare, ArrowRightSquareFill } from "react-bootstrap-icons";
import "./slideshow-style.css";
import { useState, useEffect } from "react";


export default function SlideShow(props){
    // images.reverse();

    const [imageList, setImageList] = useState([]);
    let updatedContent = [];

    const loadMediaFiles = async () => {
        if (props.images && props.images.length != 0){
            updatedContent = props.images.map((element) => {
                if (props.images.indexOf(element) == 0){
                    return <div className="col-12 d-flex slide-show-image-container p-0 position-absolute" style={{backgroundImage: `url('${element}')`, width: "100%", height: "200px", backgroundSize: "cover"}}></div>;
                }else{
                    return <div className="col-12 d-none slide-show-image-container p-0 position-absolute" style={{backgroundImage: `url('${element}')`, width: "100%", height: "200px", backgroundSize: "cover"}}></div>;
                }
            });
            console.log(updatedContent);
            setImageList(updatedContent);
        }
    }

    const slideImagesRight = () => {
        // console.dir(document.getElementById("image-container"));

        try{
            let images_ = Object.values(document.getElementById("image-container-" + props.id).children);
            for(let i = 0; i < images_.length; i++){
                const element = images_[i];
                const elementClassList = element.classList;
                if (elementClassList.contains("d-flex")){
                    let nextImageIndex = images_.indexOf(element) + 1;
                    // alert(nextImageIndex);
                    if (nextImageIndex >= images_.length){

                    }else{
                        elementClassList.replace("d-flex", "d-none");
                        images_[nextImageIndex].classList.replace("d-none", "d-flex");
                    }
                    break;
                }
            };
        }catch(error){
            console.error(error);
        }
    }

    const slideImageLeft = () => {
        try{
            let images = Object.values(document.getElementById("image-container-" + props.id).children);
            for (let i = 0; i < images.length; i++){
                const image = images[i];
                let imageClassList = image.classList;
                let previousImageIndex = 0;
                if (images.indexOf(image) != 0){
                    previousImageIndex = images.indexOf(image) - 1;
                }

                if (imageClassList.contains("d-flex")){
                    image.classList.replace("d-flex", "d-none");
                    if (previousImageIndex >= 0){
                        images[previousImageIndex].classList.replace("d-none", "d-flex");
                    }
                }
            }
        }catch(error){
            console.error(error);
        }
        // console.log(images);
    }


    useEffect(() => {
        loadMediaFiles();

        // const interval = setInterval(() => {
        //     loadMediaFiles();
        // }, 1000);
    }, []);


    return (
        <div className="row slide-show-main-container">
            <div className="col-12">
                <div className="row d-flex flex-row overflow-x-hidden" id={"image-container-" + props.id}>
                    {
                    /* 
                        <div className="col-12 slide-show-image-container p-0" style={{backgroundImage: `url(${images})`, width: "100%", height: "200px"}}>
                        </div> 
                    */
                    }
                    {imageList}
                </div>
            </div>

            {/* <div className="col-12 slide-show-image-container p-0" style={{backgroundImage: `url(${images})`}}>
            </div> */}
            
            <div className="col-12 slide-show-controls-container p-0">
                <div className="row">
                    <div className="col-2 d-flex align-items-center p-0" style={{height: "200px"}}>
                        <button className="btn border-0 position-absolute" onClick={() => {slideImageLeft()}}>
                            <ArrowLeftSquareFill className="position-absolute top-0 text-black fs-1 slider-navigation-button ms-1 ps-1"/>
                            <ArrowLeftSquare className="position-absolute top-0 text-white fs-1 slider-navigation-button ms-1 ps-1"/>
                        </button>
                    </div>
                    <div className="col-8">
                    </div>
                    <div className="col-2 d-flex align-items-center p-0" style={{height: "200px"}}>
                        <button className="btn border-0 position-absolute ps-0" onClick={() => {slideImagesRight()}}>
                            <ArrowRightSquareFill className=" position-absolute top-0 text-black fs-1 slider-navigation-button me-1 pe-1"/>
                            <ArrowRightSquare className="position-absolute top-0 text-white fs-1 slider-navigation-button me-1 pe-1"/>
                        </button>
                    </div>
                </div>
                <div className="row">

                </div>
            </div>
        </div>
    );
}
