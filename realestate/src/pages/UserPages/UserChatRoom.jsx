import { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import api from "../../api/api";
import { isLoggedIn } from "../../functions/common";
import { EmojiSmile, File, Paperclip, SendArrowUpFill } from "react-bootstrap-icons";
import "../styles/styles.css";

export default function UserChatRoom(data){
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedContactID, setSelectedContactID] = useState(null);
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
            if(isLoggedIn()){
                loadContacts();
                if(selectedContactID !== null){
                    // alert("");
                    loadMessages();
                    console.log(selectedContactID);
                }
            }else{
                navigate("/login")
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [selectedContactID]);

    return (
    <div className="row vh-100 vw-100 pt-3">
        <div className="col-3 py-5 px-4 vh-75 overflow-y-scroll" style={{backgroundColor: "#0000FF0A"}}>
            {
                contacts.map(contact => {
                    return (
                    <Row key={contact.contact_id} className="rounded-2" style={{height: "60px", backgroundColor: "#0000FF0A", borderTop: "solid", borderTopColor: selectedContactID == contact.contact_id ? "#0000FF0F" : "transparent"}}  onClick={() => {
                        setSelectedContactID(contact.contact_id);
                        console.log(contact.contact_id);
                        // setMessages([]);
                        // setChatID(contact.contact_id);
                        // loadMessages();
                    }}>
                        <Col sm={2} className="d-flex align-items-center">
                            <div style={{width: "40px", height: "40px", backgroundColor: "#AAA", borderRadius: "20px"}}></div>
                        </Col>
                        <Col sm={10} className=" d-flex align-items-center justify-content-start">
                            <Row>
                                {contact.agent_name}
                            </Row>
                        </Col>
                    </Row>
                    );
                })
            }
        </div>

        <div className="col-9 py-5 d-flex flex-column vh-100">
            <div className="row" style={{height: "70vh"}}>
                <Col sm={12} className="text-black d-flex flex-column py-3 overflow-y-scroll rounded-3 hidden-scroll-bar" style={{height: "70vh", backgroundColor: "#0000FF0A"}}>
                    {messages.map(message => {
                        return <Row className={message.owner == 'me' ? "justify-content-end" : "justify-content-start"}>
                            <div className="w-auto py-2 d-flex flex-column gap-2">
                                <Col sm={12} className="d-flex align-items-center gap-2">
                                    <div className="" style={{width: "20px", height: "20px", backgroundColor: "#555", borderRadius: "10px"}}></div>
                                    John
                                </Col>
                                <Col sm={12}>
                                    <div className="w-auto py-2 text-white px-2 " style={{backgroundColor: "#5500FF", borderRadius: "10px 10px 0px 10px"}}>
                                        {message.content}
                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <div>8:00 AM</div>
                                </Col>
                            </div>
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