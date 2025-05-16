import { useEffect } from "react";
import { Row } from "react-bootstrap"
import { Trash3Fill } from "react-bootstrap-icons";

export default function SelectedImagePreview(props){
    useEffect(() => {
        if (props.file){
            const inputElement = document.getElementById("selected-media-" + props.id);
            
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(props.file);
            inputElement.files = dataTransfer.files;
        }
    }, [props.file])
    return (
        <div className="p-0 image-node d-flex flex-column" 
            style={
                {
                    backgroundImage: `url(${props.image})`, 
                    backgroundSize: "contain", 
                    backgroundRepeat: "no-repeat", 
                    height: "180px", width: "220px"}}>
            <Row className="me-2 justify-content-end pt-1" style={{height: "10%"}}>
                <button 
                    className="btn btn-danger w-auto"
                    onClick={() => {
                        props.onDelete();
                    }}
                    >
                    <Trash3Fill size={16} color="#FFF"/>
                </button>
            </Row>
            <Row style={{height: "71%"}}>
            </Row>
            <div className="d-flex flex-row gap-2 text-white w-100 px-2 py-1" 
                id="inputFieldsContainer"
                style={{backgroundColor: "#00000088"}}>
                <input 
                    type="radio" 
                    className=" form-check-input border-1" 
                    id={"selected-media-radio-" + props.id} name="is_thumbnail" defaultChecked={props.isThumbnail} />
                {
                    props.file ? 
                    <input 
                        type="file" 
                        name="selected-media" 
                        id={"selected-media-" + props.id} 
                        fileName={props.file} 
                        hidden/>
                    : 
                    <input 
                        type="text" 
                        name="selected-media" 
                        id={`selected-media-id-${props.id}`}
                        value={props.imageID}
                        readOnly={true}
                        hidden
                        />
                }
                
                <label>Set as Thumbnail</label>
            </div>
        </div>
    );
}