import axios from "axios";
import { ACCESS } from "../constants/constants";


const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
});


api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(ACCESS);
    if (accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }else{
        config.headers.Authorization = `Bearer ${localStorage.getItem("A_ACCESS_TOKEN")}`;
    }
    return config;
}, (error) => {
    Promise.reject(error);
});




export default api;

