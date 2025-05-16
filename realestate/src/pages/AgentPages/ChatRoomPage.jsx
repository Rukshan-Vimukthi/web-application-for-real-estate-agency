import { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import api from "../../api/api";
import { isAgentLoggedIn } from "../../functions/common";
import { EmojiSmile, File, Paperclip, SendArrowUpFill } from "react-bootstrap-icons";
import "../styles/styles.css";

import ChatRoomBackgroundImage from "../../assets/ChatGPT Image May 16, 2025, 11_56_27 PM.png";


export default function ChatRoomPage(data){
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);

    const [selectedContactID, setSelectedContactID] = useState(null);
    const [receiverProfileImage, setReceiverProfileImage] = useState(null);

    const messageBoxRef = useRef();

    const [chatID, setChatID] = useState([]);

    const loadContacts = async() => {
        const response = await api.get("api/v1/user/chat/get_contacts");
        if(response.status === 200){
            const data = response.data;
            setContacts(data.contacts);
            // console.log(data);
        }
    }

    const loadMessages = async() => {
        const response = await api.post("api/v1/user/chat/get_messages", {agentChatID: selectedContactID});
        if (response.status === 200){
            const data = response.data
            if (data.status == "ok"){
                const messages = data.messages;
                setMessages(messages);
                console.log(messages);
            }
        }
    }

    const sendMessage = async() => {
        const response = await api.post("api/v1/user/chat/send", {message: messageBoxRef.current.value, chatID: selectedContactID});
        if (response.status === 200){
            const data = response.data;
            if (data.status == "ok"){
                // alert("Message Sent!");
                messageBoxRef.current.value = "";
            }
            // handle message sent response
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(isAgentLoggedIn()){
                loadContacts();
                if(selectedContactID !== null){
                    // alert("");
                    loadMessages();
                }
            }else{
                navigate("/realtor/login")
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [selectedContactID]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        }
    }, []);

    return (
        <div className="row vh-100 vw-100">
        <div className="col-3 py-3 px-4 vh-75 overflow-y-scroll" style={{backgroundColor: "#0000FF1A"}}>
            {
                contacts.map(contact => {
                    return (
                    <Row key={contact.contact_id} className="rounded-2 my-1" 
                    style={
                        {
                            height: "60px", 
                            backgroundColor: "#0000FF0A", 
                            borderTop: "solid", 
                            borderTopColor: selectedContactID == contact.contact_id ? "#0000FF0F" : "transparent",
                            boxShadow: selectedContactID == contact.contact_id ? "0px 0px 20px 1px #0000255F" : "0px 0px 20px 1px #0000",
                        }
                    }  onClick={() => {
                        setSelectedContactID(contact.contact_id);
                        setReceiverProfileImage(contact.receiverProfileImage);
                        console.log(contact.contact_id);
                        // setMessages([]);
                        // setChatID(contact.contact_id);
                        // loadMessages();
                    }}>
                        <Col sm={4} lg={3} className="d-flex align-items-center">
                            <div style={{width: "40px", height: "40px", backgroundColor: "#AAA", borderRadius: "20px", backgroundImage: `url(${contact.receiverProfileImage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}}></div>
                        </Col>
                        <Col sm={8} lg={9} className=" d-flex align-items-center justify-content-start">
                            <Row>
                                {contact.receiver_name}
                                {/* {contact.receiverProfileImage} */}
                            </Row>
                        </Col>
                    </Row>
                    );
                })
            }
        </div>

        <div className="col-9 d-flex flex-column vh-100">
            <div className="row" style={{height: "70vh"}}>
                <Col sm={12} className="text-black d-flex flex-column py-3 overflow-y-scroll rounded-3 hidden-scroll-bar" 
                style={{height: "70vh", backgroundColor: "#0000FF0A", backgroundImage: `linear-gradient(rgba(0, 0, 200, 0.08), rgba(0, 0, 200, 0.08)), url(${ChatRoomBackgroundImage})`, backgroundSize: "contain", backgroundRepeat: "repeat"}}>
                    {messages.map(message => {
                        return <Row className={message.owner == 'me' ? "justify-content-end" : "justify-content-start"}>
                            <Col xs={5} className="py-2 d-flex flex-column gap-2">
                                <Row>
                                    <Col sm={12} className="d-flex align-items-center gap-2 pb-1 ">
                                        <div className="" style={
                                            {
                                                width: "40px", 
                                                height: "40px", 
                                                backgroundColor: "#555", 
                                                borderRadius: "20px", 
                                                backgroundImage: message.owner == 'other' ? `url(${receiverProfileImage})` : `url(${message.senderProfileImage})`, 
                                                backgroundSize: "cover", 
                                                backgroundRepeat: "no-repeat"
                                            }
                                        }></div>
                                        {message.owner == "me" ? "Me" : message.senderName}
                                    </Col>
                                    <Col sm={12}>
                                        <div className="w-auto py-2 text-white px-2 " style={{backgroundColor: "#5500FF", borderRadius: (message.owner == 'me' ? "10px 10px 0px 10px" : "10px 10px 10px 0px")}}>
                                            {message.content}
                                        </div>
                                    </Col>
                                    <Col sm={12}>
                                        <div>{message.time}</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    })}
                </Col>
            </div>
            <div className="row pb-5 pt-3">
                <Col sm={10} className="">
                    <Row className="gap-1 align-items-center pb-2">
                        <Paperclip className="text-primary w-auto fs-3 px-0"/>
                        <EmojiSmile className="text-primary w-auto fs-4 px-0"/>
                    </Row>
                    <div className="row">
                        <Col sm={10}>
                            <textarea ref={messageBoxRef} rows={2} className="form-control"></textarea>
                        </Col>
                        <Col sm={2} className="">
                            <Row></Row>
                            <Row className="">
                                <button className="btn btn-primary w-auto" onClick={() => {
                                    sendMessage();
                                }}><SendArrowUpFill/> SEND</button>
                            </Row>
                        </Col>
                    </div>
                </Col>
            </div>
        </div>
    </div>
    );
}