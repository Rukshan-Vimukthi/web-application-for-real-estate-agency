

export default function SideNavBar(props){

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