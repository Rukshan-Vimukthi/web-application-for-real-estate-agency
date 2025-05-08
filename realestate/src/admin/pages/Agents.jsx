import { Plus } from "react-bootstrap-icons";
import AddAgent from "../components/dialogs/AddAgent";
import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import AgentInformation from "../components/dialogs/AgentInformation";

export default function Agents(){
    const [addAgentDialogVisibility, setAddAgentDialogVisibility] = useState(false);
    const [agents, setAgents] = useState([]);
    const [selectedAgentData, setSelectedAgentData] = useState({});


    const [agentInformationVisibility, setAgentInformationVisibility] = useState(false);
    const agentInformationVisibilityRef = useRef(agentInformationVisibility);
    const setAgentInformationVisibilityRef = data => {
        agentInformationVisibilityRef.current = data;
        setAgentInformationVisibility(data);
    }

    const [agentInformationUpdatable, setAgentInformationUpdatable] = useState(false);

    const loadAgents = () => {
        const agentSearchKeyword = document.getElementById("agent-search-box").value;
        
        api.get("api/admin/agents/get" + (agentSearchKeyword != "" ? "?kw=" + agentSearchKeyword : "")).then(response => {
            if (response.status === 200){
                const data = response.data;
                // alert(data.status);
                if (data.status == "ok"){
                    const agentComponent = [];
                    const agentInformation = data.data;
                    agentInformation.forEach(agent => {
                        agentComponent.push(
                        <tr className=" py-1">
                            <td className=""><input type="checkbox" className="form-check-input" name="agent-id" value={agent.id}/></td>
                            <td className="">{agent.userName}</td>
                            <td className="">{agent.firstName}</td>
                            <td className="">{agent.lastName}</td>
                            <td className="">{agent.email}</td>
                            <td className="d-flex gap-3"><button className="btn btn-primary" onClick={() => {
                                setSelectedAgentData({
                                    agentID: agent.id,
                                    agentUserName: agent.userName,
                                    agentFirstName: agent.firstName,
                                    agentLastName: agent.lastName,
                                    agentEmail: agent.email
                                });
                                setAgentInformationVisibility(true);
                                setAgentInformationUpdatable(false);
                                // api.get("/api/admin/agent/get?id=" + agent.id).then(response => {
                                //     if (response.status === 200){
                                //         const data = response.data;
                                //         if (data.status == "ok"){
                                //             alert("Agent data received successfully!");
                                //         }
                                //     }
                                // })
                            }}>view</button>
                            <button className="btn" style={{backgroundColor: "#00FF00", color: "#005500"}} onClick={() => {
                                setSelectedAgentData({
                                    agentID: agent.id,
                                    agentUserName: agent.userName,
                                    agentFirstName: agent.firstName,
                                    agentLastName: agent.lastName,
                                    agentEmail: agent.email,
                                    agentProfileImage: agent.profileImage
                                });
                                setAgentInformationVisibility(true);
                                setAgentInformationUpdatable(true);
                            }}>Update</button>
                            </td>
                        </tr>);
                    });

                    setAgents(agentComponent);

                }
            }
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            loadAgents();
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="col-12">
            <AddAgent visible={addAgentDialogVisibility} setVisibility={setAddAgentDialogVisibility}/>
            <AgentInformation visible={agentInformationVisibility} setVisibility={setAgentInformationVisibilityRef} data={selectedAgentData} isUpdatable={agentInformationUpdatable}/>
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-primary" onClick={() => {
                        setAddAgentDialogVisibility(true);
                    }}><Plus/>Add an Agent</button>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <input type="text" id="agent-search-box" className="form-control text-black" placeholder="search" onKeyUp={(event) => {
                                    if(event.target.value != ""){
                                        setAgentSearchKeyword(event.target.value);
                                    }else{
                                        setAgentSearchKeyword(null);
                                    }
                                }}/>
                            </div>
                        </div>
                        <div className="col-6 d-flex gap-3 justify-content-end">
                            {/* <button className="btn text-white" style={{backgroundColor: "#0000FF"}}>View</button> */}
                            
                            <button className="btn text-white" style={{backgroundColor: "#FF0000"}} onClick={() => {
                                const ids = [];
                                document.getElementsByName("agent-id").forEach(element => {
                                    if (element.checked){
                                        ids.push(element.value);
                                    }
                                })
                                api.post("api/admin/agents/delete", {ids: ids}).then(response => {
                                    if (response.status === 200){
                                        const data = response.data;
                                        // alert(data.status);
                                        if (data.status == "ok"){
                                            alert("Agent deleted!")
                                        }
                                    }
                                });
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pt-3">
                <table className=" table table-dark table-striped" id="agent-table">
                    <tbody>
                        <tr className="">
                            <th></th>
                            <th>User Name</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                        {agents}
                    </tbody>
                </table>
            </div>
        </div>
    );
}