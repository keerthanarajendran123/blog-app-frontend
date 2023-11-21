// import axios from 'axios'

// const AxiosService = axios.create({
//     baseURL:`${import.meta.env.VITE_API_URL}`,
//     headers:{
//         'Content-Type':"application/json",
//     }
// })

// AxiosService.interceptors.request.use(config=>{
//     //console.log(config)
//     const token = sessionStorage.getItem('token')
//     if(token)
//         config.headers.Authorization = `Bearer ${token}`
//     return config
// })

// export default AxiosService  



import axios from 'axios';

const AxiosService = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosService.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to capture backend errors
AxiosService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Log or handle the error here
        console.error('Backend error:', error);

        // Propagate the error further for handling in the components
        return Promise.reject(error);
    }
);

export default AxiosService;
