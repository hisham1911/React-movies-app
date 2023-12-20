import axios from 'axios'
const API_KEY="91f412b281dfcb0bec628c2a005ac224"
const axiosInstance=axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key:API_KEY,
    }
});

axiosInstance.interceptors.request.use((config)=>{
    // console.log(config);
    return config
},(err)=>{
    return Promise.reject(err)
});
axiosInstance.interceptors.response.use((response)=>{
    return response
},(err)=>{
    return Promise.rejected(err)
})

export default axiosInstance;

