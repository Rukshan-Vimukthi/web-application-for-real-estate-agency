import { Navigate } from "react-router-dom";

export default function Logout(props){
    props.login(false);
    localStorage.clear();
    return (
        <Navigate to={'/login'}/>
    );
}