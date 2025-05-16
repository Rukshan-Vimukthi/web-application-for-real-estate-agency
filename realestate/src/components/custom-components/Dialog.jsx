import { Row, Col } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

export default function Dialog(props){
    return (
        <Row 
            className={"position-fixed top-0 start-0 vh-100 vw-100 justify-content-center align-items-center " + (props.visible ? "d-flex" : "d-none")}
            style={{zIndex: 1000, backgroundColor: "#0005"}}
            >
                <Col
                    xs={props.xs}
                    sm={props.sm}
                    md={props.md}
                    lg={props.lg}
                    xl={props.xl}
                    xxl={props.xxl}
                    className="p-3 rounded-3" style={{backgroundColor: props.backgroundColor}}>
                    <Row>
                        <Col xs={10} className="fs-3 fw-bolder">
                            {props.title}
                        </Col>
                        <Col xs={2} className="d-flex justify-content-end">
                            <X size={28} onClick={() => {
                                props.setVisible(false);
                            }}/>
                        </Col>
                    </Row>
                    <Row>
                        <hr />
                    </Row>
                    <Row>
                        {props.children}
                    </Row>
                </Col>
        </Row>
    );
}