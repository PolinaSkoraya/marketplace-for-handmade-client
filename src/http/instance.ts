import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    timeout: 15000,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    }
});

instance.interceptors.request.use(function (config) {
    console.log("interceptors", config);
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    console.log("interceptors", error);

    return Promise.reject(error);
});

//Add a response interceptor
instance.interceptors.response.use(function (response) {
    console.log("interceptors", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("interceptors", error.response);

    if (error.response.status === 200) {

    }

    return Promise.reject(error);
});

export {instance};
