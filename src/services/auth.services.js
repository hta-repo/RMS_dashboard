import axiosConfig from "../axiosConfig";
import { baseURL } from "../GlobalVariables";
import axios from "axios";

const signin = async (data) => {
    const response = await axiosConfig.post("api/admin/signin", data);
    if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data.token));
    }
    return response.data;
};

const userDetail = () => {
    const token = JSON.parse(localStorage.getItem("user"));
    return axios.get(baseURL + "api/user", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + token,
        },
    });
};

const authService = {
    signin,
    userDetail,
};

export default authService;
