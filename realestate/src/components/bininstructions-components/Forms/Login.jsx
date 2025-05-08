export default function Login(props){
    return (
        <div className="d-flex flex-column text-white col-12 col-md-6 col-lg-4 border-3 bg-primary" style={{border: "solid", borderRadius: "20px", borderColor: "#0068FF", boxShadow: "0px 0px 5px 1px #00AAFFBB"}}>
            <div className="row p-2 d-flex justify-content-center rounded-top-4">
                <h2 className="w-auto">{props.name}</h2>
            </div>
            <div className="row pt-5 bg-black rounded-4">
                <div className="col-12 d-flex flex-column gap-2">
                    <div className="row px-3">
                        <label for="username" className="form-label p-0">User Name</label>
                        <input className="form-control bg-transparent text-white" id="username"/>
                    </div>
                    <div className="row px-3">
                        <label for="password" className="form-label p-0">Password</label>
                        <input type="password" className="form-control bg-transparent text-wite" id="password"/>
                    </div>
                    <div className="row px-3 pb-5">
                        <button className="btn btn-primary" onClick={() => {
                            props.login();
                        }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}