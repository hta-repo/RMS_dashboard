import axios from "axios";
import {
  baseURL,
} from "./GlobalVariables";

const user = JSON.parse(localStorage.getItem("user"));

let token
if (user === null) {
  token = ''
} else {
  token = user
}

// Next we make an 'instance' of it
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Authorization': "Bearer " + token
  }
});

// Also add/ configure interceptors && all the other cool stuff
axios.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
