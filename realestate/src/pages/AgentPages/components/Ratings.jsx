import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

export default function Ratings(props){
    const [stars, setStars] = useState([]);
    
    useEffect(() => {
        const count = parseFloat(props.rating);
        const starList = [];
        let limitReached = false;
        let color = "#FFB000";

        for (let i = 1; i <= 5; i++){
            const next = parseFloat(i + 1);
            const iteration = parseFloat(i);

            if (iteration <= count){
                starList.push(<StarFill key={"star-" + count + "-" + i} size={20} className="w-auto" color={color}/>);
                if (iteration == count){
                    limitReached = true;
                }
            }else if(count < iteration){
                if (!limitReached){
                    starList.push(<StarHalf key={"star-half-" + count + "-" + i} size={20} className="w-auto" color={color}/>);
                    limitReached = true;
                }else{
                    starList.push(<Star size={20} key={"star-" + count + "-" + i} className="w-auto" color={color}/>);
                }
            }
        }

        setStars(starList);

    }, []);

    return (
        <Row className="d-flex align-content-center">
            <Col xs={6} md={5}>
                {stars}
            </Col>
            <Col xs={3} md={2} xl={1}>
                {props.rating}
            </Col>
            <Col xs={3} md={2} xl={1} className="ps-4">
                ({props.count})
            </Col>
        </Row>
    );
}