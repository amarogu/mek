import axios from "axios";

const instance = axios.create({
    baseURL: 'https://www.mariaekalil.com/api',
    timeout: 10000
});

export default instance;