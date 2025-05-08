import { useEffect, useState } from "react";
import ChatContact from "./ChatContact";


export function onSelectChatContact(){

}


export default function Chat(props){

    const chatInfo = [
        {name: "John", last_message: "Last Name", status: "active"},
        {name: "Anna", last_message: "Last Name", status: "inactive"},
        {name: "Ariana", last_message: "Last Name", status: "inactive"},
        {name: "Micheal", last_message: "Last Name", status: "inactive"},
    ]

    const [chats, setChats] = useState([]);

    const onClickChatContact = () => {

    };

    const onSelectChatContact = (element) => {
        element.name = "clicked!";
        chats.forEach((item) => {
            if(item.name == element.name){
                const itemIndex = chats.indexOf(item);
                chatInfo[itemIndex].name = "clicked";
            }
        });
    };

    const loadChats = () => {
        const chatComponents = chatInfo.map((element) => {return <ChatContact name={element.name} last_message={element.last_message} key={element.name} id={element.name} onclick={() => {onSelectChatContact(element)}}/>});
        setChats(chatComponents);
    };

    useEffect(() => {loadChats()});

    return (
        <div className="col-12 vh-100 bg-dark p-0">
            <div className="row">
                <div className="col-3">
                    {chats}
                </div>
                <div className="col-10">

                </div>
            </div>
        </div>
    );
}