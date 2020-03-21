import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    timeout: 15000,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    }
});

export {instance};
