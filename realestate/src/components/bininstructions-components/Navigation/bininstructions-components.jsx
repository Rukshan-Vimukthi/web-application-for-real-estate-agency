function setActivatedItem(event){
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

export function SideNavBar(props){

    let classes = "";

    if (props.className !== null || props.className !== undefined){
        classes = props.className;
    }

    return (
    <div className={"col-md-2 vh-100 position-fixed text-white pt-2 mt-5 " + classes}>
        <ul className=" list-unstyled sidebar-navigation-items pt-4 bg-black vh-100" id="sidebar-navigation">
            {props.children}
        </ul>
    </div>
    );
}


export function SideNavBarItem(props){
    return (
        <li className="p-2 d-flex align-items-center gap-3" key={props.id} id={props.id} onClick={(event) => {setActivatedItem(event) }} >
            {props.icon}
            {props.text}
        </li>
    );
}



export function NavContent(props){
  let classes = "";
  if (props.className !== null || props.className !== undefined){
    classes = props.className;
  }
  return (
    <div className={"row p-3 " + classes} style={{display: "none"}} id={props.for + "-content"}>{props.children}</div>
  );
}

export function NavigationView(){
  return (
    <div className="row">
      
    </div>
  );
}


export function Footer(props){
  return (
      <div className="row vw-100 bg-white pt-5">
        <div className="col-12">
            <div className="row p-5 d-flex flex-column flex-md-row">
                { props.content }
            </div>
            <div className="row p-3 bg-black text-white flex-column flex-md-row">
                <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
                    2024 &copy; All rights reserved.
                </div>
                <div className="col-12 col-md-6">
                    <div className="row d-flex justify-content-center justify-content-md-end">
                        <span className="bg-primary p-1 px-2 px-md-5 rounded-1 w-auto">Developed by bininstructions</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}