import { Grid1x2Fill, HouseFill, MapFill, ListCheck, ChatDotsFill } from "react-bootstrap-icons";
import api from "../../api/api";
import NavContainer from "../../components/NavContainer/NavContainer";
import Chat from "../../components/chat-components/Chat";
import { NavContent, SideNavBar, SideNavBarItem } from '../../components/bininstructions-components/Navigation/bininstructions-components';

export default function Profile(){

    return (
        <div className="row vh-100">
            <div className="col-12 p-0">
                <div className="row">
                    <SideNavBar>
                        <SideNavBarItem text="Dashboard" id="dashboard" icon={<Grid1x2Fill className="fs-3" />} />
                        <SideNavBarItem text="Houses" id="houses" icon={<HouseFill className="fs-3" />} />
                        <SideNavBarItem text="Lands" id="lands" icon={<MapFill className="fs-3" />} />
                        <SideNavBarItem text="History" id="history" icon={<ListCheck className="fs-3" />}/>
                        <SideNavBarItem text="Chat" id="chats" icon={<ChatDotsFill className="fs-3" />}/>
                    </SideNavBar>
                    <div className="col-2">
                    </div>
                    <div className="col-10 bg-dark mt-5 bg-dark px-0">
                        <NavContent for="dashboard"></NavContent>
                        <NavContent for="houses"></NavContent>
                        <NavContent for="lands"></NavContent>
                        <NavContent for="history"></NavContent>
                        <NavContent for="chats">
                            <Chat/>
                        </NavContent>
                    </div>
                </div>
            </div>
        </div>
    );
}