import { setActivatedItem } from "./NavContainer";




export default function SideNavBarItem(props){
    return (
        <li className="p-2 d-flex align-items-center gap-3" key={props.id} id={props.id} onClick={(event) => {setActivatedItem(event) }} >
            {props.icon}
            {props.text}
        </li>
    );
}