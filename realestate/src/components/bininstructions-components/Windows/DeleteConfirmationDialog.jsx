import { Col, Row } from "react-bootstrap";
import Dialog from "./Dialog";

export default function DeleteConfirmationDialog(props){
    return (
        <Dialog title="Warning" titleColor="#FF0000" visible={props.visible} setVisibility={props.setVisibility}>
            <Row>
                <Col xs={12} className="px-5">
                    <div className="row text-danger">
                        {props.content}
                    </div>
                    <div className="row pt-2">
                        <button className="btn w-auto text-white" style={{backgroundColor: "#FF0000"}} onClick={() => {
                            props.onDelete();
                        }}>DELETE</button> 
                    </div>
                </Col>
            </Row>
        </Dialog>
    );
}