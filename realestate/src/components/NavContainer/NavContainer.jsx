import { useState } from "react";
import SideNavBar from "./SideNavBar";
import SideNavBarItem from './SideNavBarItem';
import './css/nav-bar-item-style.css';
import {
  ChatDotsFill,
    Grid1x2Fill,
    HouseFill,
    ListCheck,
    MapFill,
    PersonArmsUp,
    PersonBadge,
    PersonFill,
    PersonX,
  } from "react-bootstrap-icons";
import api from "../../api/api";


export function setActivatedItem(event){
  let sidebarItem = event.target;
  let sidebarItemId = sidebarItem.id;

  console.log(sidebarItem);

  sidebarItem.style.backgroundColor = "#0000FF33";
  sidebarItem.style.color = "#0088FF";

  let sidebarNavigation = document.getElementById("sidebar-navigation");
  let items = sidebarNavigation.getElementsByTagName("li");
  console.log(items);

  for (let i = 0; i < items.length; i++) {
    let element = items[i];

    let contentIdForItem = element.id + "-content";
    let content = document.getElementById(contentIdForItem);
    // let classList = content.classNameList;

    if (element.id != sidebarItemId) {
      element.style.backgroundColor = "#000000";
      element.style.color = "white";

      if (content.style.display == "flex") {
        content.style.display = "none";
      }
    } else {
      //alert(contentIdForItem);
      if ((content.style.display = "none")) {
        content.style.display = "flex";
      }
    }
  }
}

export default function NavContainer() {
  const [itemToActive, activateItem] = useState("dashboard");

  const [dashboardContent, setDashboardContent] = useState(null);
  const [housesContent, setHousesContent] = useState(null);
  const [landsContent, setLandsContent] = useState(null);
  const [historyContent, setHistoryContent] = useState(null);

  const getDashboardContent = async () => {
    const response = await api.get("api/public/user/profile-information", {});
  
    const data = response.data;
    console.log(data);
  
  }
  
  
  const getHistoryContent = async () => {
    const response = await api.get("api/public/user/history", {});
  
    const data = response.data;
    console.log(data);
  }
  
  
  const getHousesContent = async () => {
    const response = await api.get("api/public/user/houses", {});
  
    const data = response.data;
    console.log(data);
  }
  
  
  const getLandsContent = async () => {
    const response = await api.get("api/public/user/lands", {});
  
    const data = response.data;
    console.log(data);
  }

  return (
    <div className="col-12 px-0">
        <div className="row">
            <div className="col-md-2">
                <SideNavBar>
                  <SideNavBarItem text="Dashboard" id="dashboard" icon={<Grid1x2Fill className="fs-3" />} />
                  <SideNavBarItem text="Houses" id="houses" icon={<HouseFill className="fs-3" />} />
                  <SideNavBarItem text="Lands" id="lands" icon={<MapFill className="fs-3" />} />
                  <SideNavBarItem text="History" id="history" icon={<ListCheck className="fs-3" />}/>
                  <SideNavBarItem text="Chat" id="chats" icon={<ChatDotsFill className="fs-3" />}/>
                </SideNavBar>
            </div>

            <div className="col-md-10">
                <div className="row justify-content-start p-4 " style={{ display: "none" }} id="dashboard-content">
                    <div className="col-12">
                    {dashboardContent}
                  </div>
                </div>

                <div className="row justify-content-start p-4 " style={{ display: "none" }} id="houses-content">
                    <div className="col-12">
                    {housesContent}
                  </div>
                </div>

                <div className="row justify-content-start p-4 " style={{ display: "none" }} id="lands-content">
                    <div className="col-12">{landsContent}</div>
                </div>

                <div className="row justify-content-start p-4 " style={{ display: "none" }} id="selling-history-content">
                    <div className="col-12 text-black">
                        {historyContent}
                    </div>
                </div>
                <div className="row justify-content-start p-4 " style={{ display: "none" }} id="chats-content">
                    <div className="col-12 text-black">
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
