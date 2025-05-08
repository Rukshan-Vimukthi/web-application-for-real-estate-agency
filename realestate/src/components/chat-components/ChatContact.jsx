import { useState } from "react";

export default function ChatContact(props){
    const [backgroundColor, setBackgroundColor] = useState("#222222");
    if (props.status == "inactive"){
        // setBackgroundColor("#222222");
    }else if(props.status == "active"){
        // setBackgroundColor("#888888");
    }
    return (
        <div className="row bg-black p-2" style={{backgroundColor: backgroundColor}} onClick={() => {props.onclick()}}>
            <div className="col-3">
                <div style={{backgroundImage: `url('${props.agent_profile_image}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
            </div>
            <div className="col-8">
                <div className="row text-white fw-bolder">
                    {props.name}
                </div>
                <div className="row text-white-50 py-1">
                    {props.last_message}
                </div>
            </div>
        </div>
    );
}