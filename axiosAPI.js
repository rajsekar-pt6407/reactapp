import axios from 'axios';
export const apiCalls=(inputdata)=>{
        axios.defaults.baseURL="https://jsonplaceholder.com";
        return axios.post("/posts",inputdata);
}