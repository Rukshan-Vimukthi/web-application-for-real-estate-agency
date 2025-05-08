import {useEffect, useState} from 'react'
import image from "../../assets/Home/Images/todd-kent-178j8tJrNlc-unsplash.jpg";
import api from '../../api/api';
import {ACCESS, REFRESH} from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { register } from '../../functions/common';

import "./css/register.css";


export default function Register(props){
    let registerFormFieldBackgroundColor = "#FFFFFFbb";
    // registerFormFieldBackgroundColor = "#FFFFFF33"
    let textColor = "text-black";
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCountries();
    })


    const register_ = async() => {

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phone-number").value;
        const country_id = document.getElementById("country").selectedOptions[0].value;
        const city_id = document.getElementById("city").selectedOptions[0].value;

        const data_ = {
            first_name: firstName, 
            last_name: lastName, 
            email: email, 
            password: password, 
            phone: phone, 
            country_id: country_id, 
            city_id: city_id
        };


        const result = await register({username: firstName + " " + lastName, password: password, data: data_}, ACCESS, REFRESH);
        console.log(result);
        if(result){
            alert("true");
            navigate("/profile");
        }

        /*
        const response = await api.post("/api/public/user/register", 
        );

        if(response.status === 200){
            if (response.data.status == "success"){
                const tokenResponse = await api.post("/api/token/", {username: response.data.username, password: password});
                if(tokenResponse.status === 200){
                    console.log(tokenResponse);   
                    localStorage.setItem(ACCESS, tokenResponse.data.access);
                    localStorage.setItem(REFRESH, tokenResponse.data.refresh);
                    const navigate = useNavigate()
                    props.login(true);
                }
            }
        }
        console.log(response);*/
    }

    const getCountries = async() => {
        const response = await api.get("/api/public/country-list");

        const data = JSON.parse(response.data.data);
        const items = data.map((element) => <option value={element.pk} key={element.pk}>{element.fields.county_name}</option>);
        setCountries(items);
    }

    const getCities = async (event) => {
        const id = event.target.selectedOptions[0].value;
        const response = await api.get(`/api/public/city-list?country_id=${id}`);
        if (response.status === 200){
            const data = JSON.parse(response.data.data);
            console.log(data);
            const items = data.map((element) => <option value={element.pk} key={element.pk}>{element.fields.city_name}</option>);
            setCities(items);
        }
    }

    // getCountries();
    // textColor = "text-white";
    return (
        <div className="row py-5 justify-content-center justify-content-lg-start" style={{backgroundImage: `url(${image})`, backgroundSize: "cover"}}>
            <div className="d-none d-md-flex col-md-5">

            </div>
            <div className="col-11 col-md-8 col-lg-6 pt-5">
                <div className="row pt-1 pt-md-5 pb-3">
                    <div className="col-12 col-lg-10 d-flex flex-column gap-3 pb-5 pt-3 rounded-3" style={{backgroundColor: "#00000002", backdropFilter: "blur(5px)"}}>
                        <div className="row">
                            <div className="col-6">
                                <input className={"form-input form-control " + textColor} style={{backgroundColor: registerFormFieldBackgroundColor}} type="text" id="firstName" placeholder="first name"/>
                            </div>
                            <div className="col-6">
                                <input className={"form-input form-control "  + textColor} style={{backgroundColor: registerFormFieldBackgroundColor}} type="text" id="lastName" placeholder="last name"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input className={"form-input form-control "  + textColor} style={{backgroundColor: registerFormFieldBackgroundColor}} type="email" id="email" placeholder="Enter email"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input className={"form-input form-control "  + textColor} style={{backgroundColor: registerFormFieldBackgroundColor}} type="password" id="password" placeholder="password"/>
                            </div>
                            <div className="col-6">
                                <input className={"form-input form-control "  + textColor} style={{backgroundColor: registerFormFieldBackgroundColor}} type="password" id="confirmation-password" placeholder="Confirm password"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input className={"form-input form-control "  + textColor} style={{backgroundColor: registerFormFieldBackgroundColor}} type="text" id="phone-number" placeholder="Phone Number"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select id="country" style={{backgroundColor: registerFormFieldBackgroundColor}} className={"form-select " + textColor} onChange={(event) => {
                                    getCities(event);
                                }}>
                                    <option>-- Select Your Country --</option>
                                    {countries}
                                </select>
                            </div>
                            <div className="col-6">
                                <select id="city" style={{backgroundColor: registerFormFieldBackgroundColor}} className={"form-select " + textColor} onChange={(event)=> {
                                    //getCities();
                                    console.log(event);
                                    }
                                }>
                                    <option>-- Select Your City --</option>
                                    {cities}
                                </select>
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-1 d-flex justify-content-center align-items-center">
                                <input type="checkbox" className='form-check-input fs-5'/>
                            </div>
                            <div className="col-9 d-flex align-items-center pt-2">
                                <label className='form-label text-white'>I have read and agree to the terms & conditions</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-primary w-100" style={{backgroundColor: "#0000FF"}} onClick={() => {
                                    register_();
                                }}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}