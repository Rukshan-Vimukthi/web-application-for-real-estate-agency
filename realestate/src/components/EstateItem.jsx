import image from "../assets/Home/Images/todd-kent-178j8tJrNlc-unsplash.jpg"


export default function EstateItem(props){
    let tagColor = "#00AAFF55";
    let tagTextColor = "#000000";
    let status = "";
    let availableDate = <p> </p>;


    let numberOfBedrooms = 0;
    let numberOfBathRooms = 0;
    let numberOfGarages = 0;
    let area = 0;

    if (props.status == 1){
        status = "available";
    }else if(props.status == 2){
        status = "sold out";
        tagColor = "#FF000055";
        tagTextColor = "#BB0000";
    }else if(props.status == 3){
        status = "checking";
    }else if(props.status == 4){
        status = "rented"
        tagColor = "#FF000055"
        tagTextColor = "#BB0000";
        availableDate = <p>until {props.date}</p>
    }
    return (
        <div className="col-3 card p-0">
            <div className="card-img">
                <img src={image} width={"100%"} height={"200px"}/>
            </div>
            <div className="card-body">
                <div className="row d-flex flex-xl-column align-items-start">
                    <div className="w-auto">
                        <span className="w-auto d-flex justify-content-center rounded-2 px-3" style={{backgroundColor: tagColor, color: tagTextColor}}>{status}</span>
                    </div>
                    <div className="w-auto" style={{color: tagTextColor}}>
                        {availableDate}
                    </div>
                </div>
                <div className="row">
                    {numberOfBedrooms}
                </div>
                <div className="row">
                    {numberOfBathRooms}
                </div>
                <div className="row">
                    {numberOfGarages}
                </div>
                <div className="row">
                    {area}
                </div>
                <div className="row px-2">
                    {props.address}
                </div>
                <div className="row px-2">
                    <div className="col-3 p-0">
                        Price
                    </div>
                    <div className="col-9 p-0 d-flex justify-content-end">
                        ${props.price}
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-center">
                <button className="btn btn-primary w-100">View Property</button>
            </div>
        </div>
    );
}