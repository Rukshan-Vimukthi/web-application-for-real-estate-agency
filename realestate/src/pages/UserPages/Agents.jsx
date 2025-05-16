import { Row } from "react-bootstrap";
import AgentCard from "../../components/custom-components/AgentCard";
import api from "../../api/api.jsx";
import { useEffect, useState } from "react";

export default function Agents(){

    const [agents, setAgents] = useState([]);

    const getAgentsData = async() => {
        const response = await api.get("/api/v1/agents/all");
        if (response.status === 200){
            const data = response.data;
            if (data.status == "ok"){
                const agentsData = data.agentsData;
                const agentsCards = agentsData.map((agentData) => {
                    return <AgentCard firstName={agentData.firstName}
                    lastName={agentData.lastName}
                    bio={agentData.bio} />
                })

                setAgents(agentsCards);
            }
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            getAgentsData();
        }, 1000);

        return () => clearInterval(interval);
    }, [])
    
    return (
        <Row className="pt-5 mt-5 px-5 gap-3">
            {agents}
        </Row>
    );
}