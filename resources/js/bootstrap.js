import axios0 from "axios";
import auth from "./auth";
import router from "./router";

window.axios = axios0;

window.axios.defaults.baseURL = 'http://order-processing-system.test';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = `Bearer ${auth.getToken()}`;

// Add a response interceptor
window.axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.status === 401) {
        router.replace('/login');
    }

    return Promise.reject(error);
});
