import axios from "axios";

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    proxy: {
        host: 'mariaekalil.com',
        port: 80,
        protocol: 'https'
    }
});

export default instance;