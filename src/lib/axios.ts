import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:80/api',
    timeout: 10000
});

export default instance;