import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:3000/api',
    timeout: 10000
});

export default instance;