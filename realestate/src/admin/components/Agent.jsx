export default function Agent(props){
    return (
        <div className="row align-items-center py-2 rounded-2" style={{backgroundColor: "#000033"}}>
            <div className="col-4">
                {props.name}
            </div>
            <div className="col-4">
                {props.email}
            </div>
            <div className="col-4 d-flex flex-row justify-content-end">
                <button className="btn text-white" style={{backgroundColor: "#0055FF"}} onClick={() => {
                    props.setAgentInformation({"id": props.id, "name": props.name});
                    // alert("");
                    props.setDialogVisibility(false);
                }}>SELECT</button>
            </div>
        </div>
    );
}