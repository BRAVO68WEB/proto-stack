import axios from "axios";

let baseURL;

if (process.env.NODE_ENV !== 'production') {
    baseURL = process.env.REACT_APP_PROD_API_URL;
    console.log(baseURL);
}
else {
    baseURL = process.env.REACT_APP_DEV_API_URL;
    console.log(baseURL);
}

export default axios.create({
    baseURL: baseURL
})