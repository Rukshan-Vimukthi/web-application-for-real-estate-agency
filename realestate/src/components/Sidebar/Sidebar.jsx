import { useState } from "react";
import {
  Grid1x2Fill,
  HouseFill,
  ListCheck,
  MapFill,
  PersonArmsUp,
  PersonBadge,
  PersonFill,
  PersonX,
} from "react-bootstrap-icons";
import "./css/sidebar-style.css";
import Dashboard from "../../admin/pages/Dashboard";
import Employees from "../../admin/pages/Employees";

export default function Sidebar() {
  const [itemToActive, activateItem] = useState("dashboard");

  function setActivatedItem(event) {
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

  return (
    <div className="col-12 px-0">
      <div className="col-md-2 vh-100 position-fixed bg-black text-white">
        <ul className=" list-unstyled sidebar-navigation-items" id="sidebar-navigation">
          <li className="p-2 d-flex align-items-center gap-3" key="dashboard" id="dashboard" onClick={setActivatedItem} >
            <Grid1x2Fill className="fs-3" />
            Dashboard
          </li>
          <li className="p-2 d-flex align-items-center gap-3" key="houses" id="houses" onClick={setActivatedItem}>
            <HouseFill className="fs-3" />
            Houses
          </li>
          <li className="p-2 d-flex align-items-center gap-3" key="lands" id="lands" onClick={setActivatedItem}>
            <MapFill className="fs-3" />
            Lands
          </li>
          <li className="p-2 d-flex align-items-center gap-3" key="users" id="users" onClick={setActivatedItem}>
            <PersonFill className="fs-3" />
            Users
          </li>
          <li className="p-2 d-flex align-items-center gap-3" key="employees" id="employees" onClick={setActivatedItem}>
            <PersonBadge className="fs-3" />
            Employees
          </li>
          <li className="p-2 d-flex align-items-center gap-3" key="selling-history" id="selling-history" onClick={setActivatedItem}>
            <ListCheck className="fs-3" />
            Selling History
          </li>
        </ul>
      </div>
      <div className="col-md-10 ps-5">
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-10">

                    <div className="row justify-content-start p-4 " style={{ display: "none" }} id="dashboard-content">
                      <div className="col-12">
                        <Dashboard/>  
                      </div>
                    </div>

                    <div className="row justify-content-start p-4 " style={{ display: "none" }} id="houses-content">
                      <div className="col-12">
                        Houses
                      </div>
                    </div>

                    <div className="row justify-content-start p-4 " style={{ display: "none" }} id="lands-content">
                    <div className="col-12">Lands</div>
                    </div>

                    <div className="row justify-content-start p-4 " style={{ display: "none" }} id="users-content">
                    <div className="col-12">users</div>
                    </div>

                    <div className="row justify-content-start p-4 " style={{ display: "none" }} id="employees-content">
                      <div className="col-12">
                        <Employees/>
                      </div>
                    </div>

                    <div className="row justify-content-start p-4 " style={{ display: "none" }} id="selling-history-content">
                        <div className="col-12 text-black">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum impedit modi sit sed minus temporibus ipsum repudiandae libero blanditiis distinctio, natus quos praesentium eaque reiciendis eum, maiores quisquam! Assumenda, earum.
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    </div>
    </div>
  );
}
