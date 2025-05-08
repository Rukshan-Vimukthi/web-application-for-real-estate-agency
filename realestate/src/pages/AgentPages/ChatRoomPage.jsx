import { useEffect, useState } from "react";
import { SendFill } from "react-bootstrap-icons";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";
import LoginPage from "./LoginPage";

export default function ChatRoomPage(){
    const [loggedIn, setLoggedIn] = useState(true);
    const [chats, setChats] = useState([]);

    const getChats = async () => {
        const response = await api.get("api/cc/get_chats");
        if (response.status === 200){
            const text = JSON.parse(response.data.chats);
            const chatsActivated = [];
            const values = Object.values(text);
            console.log(values);
        }
    };
    
    return (
    <div className="row">
        <div className="row vh-100 bg-dark">
            <div className="col-3 overflow-y-scroll" id="" style={{"scrollbarColor": "transparent transparent"}}>

            </div>
            <div className="col-9 d-flex align-items-end p-3 ps-5">
                <div className="row overflow-y-scroll">

                </div>
                <div className="row w-100 d-flex gap-3">
                    <div className="col-9">
                        <div className="row">
                            <textarea type="text" className="form-control" placeholder="Type message"></textarea>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="row">
                            <button className="btn btn-primary d-flex flex-row justify-content-center algin-items-center gap-2 w-auto">send<SendFill className="m-1 p-0"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}