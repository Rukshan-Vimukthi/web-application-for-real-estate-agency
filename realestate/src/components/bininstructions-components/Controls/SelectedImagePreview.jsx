export default function SelectedImagePreview(props){
    return (
        <div className="p-1 image-node d-flex flex-column justify-content-end" style={{backgroundImage: `url(${props.image})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height: "180px", width: "220px"}}>
            <div className="d-flex flex-row gap-2 text-white w-auto px-0" style={{backgroundColor: "#00000088"}}>
                <input type="radio" className=" form-check-input border-1" id={"selected-media-radio-" + props.id} name="is_thumbnail" />
                <input type="file" name="selected-media" id={"selected-media-path-" + props.id} value={props.fileName} hidden/>
                <label>Set as Thumbnail</label>
            </div>
        </div>
    );
}