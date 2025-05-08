import { useEffect, useRef, useState } from "react";
import Dialog from "../../../components/bininstructions-components/Windows/Dialog";
import Agent from "../Agent";
import api from "../../../api/api";
import { XSquare } from "react-bootstrap-icons";

export default function SelectAgent(props){
    const [agents, setAgents] = useState([]);

    const [visibility, setVisibility] = useState(props.visible);
    const visibilityRef = useRef(visibility);
    const setVisibilityRef = data => {
        setVisibility(data);
        visibilityRef.current = data;
        props.setVisible(data);
    }

    const loadAgents = () => {
        
            api.get("api/admin/agents/get").then(response => {
                if (response.status === 200){
                    const data = response.data;
                    if (data.status == "ok"){
                        const elements = [];
                        data.data.forEach(element => {
                            elements.push(<Agent key={"agent-" + element.id} id={element.id} name={element.firstName} email={element.email} setAgentInformation={props.setAgentInformation} setDialogVisibility={setVisibilityRef}/>)
                        });
                        // console.log(elements);
                        setAgents(elements);
                    }
                }
            });
    }
    useEffect(() => {
        const interval = setInterval(() => {
            loadAgents();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
        <Dialog title="Select Agent" visible={props.visible} setVisibility={props.setVisible}>
            <div className="row">
                <div className="col-12">
                    <div className="row">{agents}</div>
                </div>
            </div>
        </Dialog>
        </>
    );
}