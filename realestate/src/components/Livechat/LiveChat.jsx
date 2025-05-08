import { ChatDotsFill } from "react-bootstrap-icons"
import './css/style.css'
import { useState } from "react";
import api from '../../api/api';



function sendMessage(){
    
    return (
        <div className="row">

        </div>
    );
}



export default function LiveChat(){
    const [chatRoomState, setChatRoomState] = useState("d-none");
    const [messages, setMessages] = useState([])
    const [allowed, setAllowed] = useState(false);
    const [email, setEmail] = useState(null);

    const authorize = async (email_) => {
        const response = await api.post("/api/anonymous/permission/chat/get", {email: email_});
        const data = response.data;
        if (response.status === 200){
            if (data.status == "ok"){
                setEmail(email_);
                setAllowed(true);
            }
        }
        console.log(data);
    }

    const sendMessage = async (text) => {
        let messages_ = [messages];
        const response = await api.post("/api/anonymous/message/post", {message: text, email: email});
        if (response.status === 200){
            const data = response.data;
            let messageStatusText = "";
            if (data.status == "sent"){
                let date = new Date();
                messageStatusText = `${date.getHours()}:${date.getMinutes()}`;
            }

            const messageView = <div className="row d-flex justify-content-end">
                            <span className="w-auto bg-primary text-white p-2 rounded-2 me-2">{text}</span>
                            <span className="d-flex justify-content-end align-items-center" style={{fontSize: "13px"}}>
                                <span className="w-auto d-flex justify-content-end">{messageStatusText}</span>
                            </span>
                </div>;
            messages_.push(messageView);
            setMessages(messages_);
            // alert(data.status);
        }
    }

    const receiveMessage = async () => {
        const response = await api.get("/api/anonymous/message/get")
    }


    let classNames = "col-11 col-md-4 col-lg-4 bg-white rounded-4 p-4 mt-5 me-4 position-fixed end-0 " + chatRoomState + " flex-column";
    let content = "";
    if (allowed){
        content = <div className="col-12 d-flex flex-column gap-3">{messages}</div>;
    }else{
        content = <div className="col-12 f-flex flex-column">
            <div className="row d-flex justify-content-center align-items-center" style={{height: "100%"}}>
                <div className="col-10 d-flex flex-column gap-2">
                    <div className="row">
                        <input className="form-control border-black text-black" placeholder="enter your email here" type="email" id="email"/>
                    </div>
                    <div className="row">
                    <button className="btn btn-primary" onClick={() => {
                        authorize(document.getElementById("email").value);
                    }}>Connect</button>
                    </div>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="row d-flex justify-content-end align-items-end">
            <div className="col-12 d-flex flex-column p-0 bg-transparent">
                <div className="row d-none d-md-flex justify-content-end px-5 bg-transparent" style={{height: "0px"}}>
                    <div className={classNames} style={{height: "480px", top: "20px", boxShadow: "0px 0px 10px 10px #00000022"}} id="chat-room">
                        <div className="row position-relative overflow-y-scroll overflow-x-auto ps-3" style={{height: "380px"}}>
                            {content}
                        </div>
                        <div className="row d-flex gap-md-0 gap-2 pt-3">
                            <div className="col-12 col-md-10 p-0 pe-md-2">
                                <input type="text" id="message" className="w-100 form-control text-black border-black" placeholder="enter message"/>
                            </div>
                            <div className="col-12 col-md-2">
                                <div className="row">
                                    <button className="btn btn-primary" onClick={() => {sendMessage(document.getElementById("message").value)}}>send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex d-md-none justify-content-end px-5 bg-transparent" style={{height: "0px"}}>
                    <div className={classNames} style={{height: "380px", top: "20px", boxShadow: "0px 0px 10px 10px #00000022"}} id="chat-room">
                        <div className="row position-relative overflow-y-scroll overflow-x-auto ps-3" style={{height: "380px"}}>
                            {content}
                        </div>
                        <div className="row d-flex gap-md-0 gap-2 pt-3">
                            <div className="col-12 col-md-10 p-0 pe-md-2">
                                <input type="text" id="message" className="w-100 form-control text-black border-black" placeholder="enter message"/>
                            </div>
                            <div className="col-12 col-md-2">
                                <div className="row">
                                    <button className="btn btn-primary" onClick={() => {sendMessage(document.getElementById("message").value)}}>send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-end position-fixed bottom-0 end-0 mt-5 bg-transparent">
                    <div className="live-chat-button z-0" onClick={()=>{
                        if (chatRoomState == "d-none"){
                            setChatRoomState("d-flex");
                        }else{
                            setChatRoomState("d-none");
                        }
                    }} style={{width: "180px", height: "60px", borderRadius: "30px", backgroundColor: "black", margin: "0px 50px 50px 0px", display: "flex", justifyContent: "left", alignItems: "center",border: "solid #BBBBBB"}}>
                        <ChatDotsFill className="text-white fs-2"/>
                        <span className="fs-4 text-white ps-3">Live chat</span>
                    </div>
                </div>
            </div>
        </div>
    );
}