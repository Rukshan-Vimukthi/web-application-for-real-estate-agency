import Dialog from "./custom-components/Dialog.jsx";
import {Row, Col} from "react-bootstrap";

export default function RequestPropertyVisitDialog(props){
    return (
        <Dialog xs={11} sm={10} md={9} lg={8} xl={6} xxl={6} 
        title="Request a visit"
        backgroundColor="#FFF" 
        visible={props.visible} 
        setVisible={props.setVisible}>
            <Col xs={12} className="px-3 d-flex flex-column gap-2">
                <Row>
                    <Col xs={12}>
                        <label className=" form-label">Full Name</label>
                        <input type="text" className="form-control"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <label className=" form-label">Email</label>
                        <input type="text" className="form-control"/>
                    </Col>
                    <Col xs={12} md={6}>
                        <label className=" form-label">Phone Number</label>
                        <input type="text" className="form-control"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <label className=" form-label">Preferred Date</label>
                        <input type="date" className="form-control"/>
                    </Col>

                    <Col xs={12} md={4}>
                        <label className=" form-label">Preferred Time Slot</label>
                        <select className=" form-select">
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                        </select>
                    </Col>

                    <Col xs={12} md={4}>
                        <label className=" form-label">Time</label>
                        <input type="time" className="form-control"/>
                    </Col>

                    <Col xs={12} md={4}>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <label className=" form-label">Extra Note:</label>
                        <textarea className="form-control" rows="5" placeholder="Add any extra information you need to add here">
                            
                        </textarea>
                    </Col>
                </Row>
                <Row className="justify-content-end pt-3">
                    <button className="btn btn-primary w-auto">Requst a visit</button>
                </Row>
            </Col>
        </Dialog>
    );
}