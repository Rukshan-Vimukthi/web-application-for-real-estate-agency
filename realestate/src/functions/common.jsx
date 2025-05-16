import api from "../api/api";
import { ACCESS, REFRESH } from '../constants/constants';
import { jwtDecode } from "jwt-decode";

export const getCountries = async(setCountries) => {
    const response = await api.get("/api/public/country-list");

    const data = JSON.parse(response.data.data);
    const items = data.map((element) => <option value={element.pk} key={element.pk}>{element.fields.county_name}</option>);
    setCountries(items);
}

export const getCities = async(setCities, event) => {
    const id = event.target.selectedOptions[0].value;
    const response = await api.get(`/api/public/city-list?country_id=${id}`);
    if (response.status === 200){
        const data = JSON.parse(response.data.data);
        console.log(data);
        const items = data.map((element) => <option value={element.pk} key={element.pk}>{element.fields.city_name}</option>);
        setCities(items);
    }
}


export const logIn = async (credentials, accessTokenKey, refreshTokenKey) => {
    const response = await api.post("/api/public/user/login", {username: credentials["username"], password: credentials["password"]});
    if(response.status === 200){
        const data = response.data.data;
        if(data.status == "ok"){
            const accessToken = localStorage.getItem(accessTokenKey);
            const refreshToken = localStorage.getItem(refreshTokenKey)

            if(accessToken){
                const decodedAccessToken = jwtDecode(accessToken);
                const expDate = decodedAccessToken.exp;
                const currentDate = Date.now() / 1000;

                if(expDate < currentDate){
                    const refreshToken = await api.post("/api/token/refresh", {refresh: refreshToken});
                    if (refreshToken.status === 200){
                        localStorage.setItem(accessTokenKey, refreshToken.data.access);
                        localStorage.setItem(refreshTokenKey, refreshToken.data.refresh);
                        return true;
                    }
                    return false;
                }
                return true;
            }
            return true;
        }
        return false;
    }
    return false;
}


export const register = async (credentials, accessTokenKey, refreshTokenKey) => {
    const response = await api.post("/api/public/user/register", {username: credentials["username"], password: credentials["password"], data: credentials["data"]});
    console.log(response);
    if (response.status === 200){
        const data = response.data;
        if (data.status == "ok"){
            const token_response = await api.post("/api/token/", {username: data.username, password: credentials["password"]});
            console.log(token_response);
            if (token_response.status === 200){
                const access_token = token_response.data.access;
                const refresh_token = token_response.data.refresh;

                localStorage.setItem(accessTokenKey, access_token);
                localStorage.setItem(refreshTokenKey, refresh_token);
                return true;
            }
            return false;
        }
        return false;
    }
    return false;
}


export function isLoggedIn(){
    const accessToken = localStorage.getItem(ACCESS);
    if (accessToken == null){
        return false;
    }else{
        const decodedAccessToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        const expTime = decodedAccessToken.exp;
        if (currentTime < expTime){
            return true;
        }
        return false;
    }
}

export function isAgentLoggedIn(){
    const accessToken = localStorage.getItem("A_ACCESS_TOKEN");
    if (accessToken == null){
        return false;
    }else{
        const decodedAccessToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        const expTime = decodedAccessToken.exp;
        if (currentTime < expTime){
            return true;
        }
        return false;
    }
}


export const initChat = async(data) => {
    const response = await api.post("api/v1/user/chat/init", {agent_id: data});
    if (response.status == 200){
        const data = response.data;
        if(data.status == "ok"){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}