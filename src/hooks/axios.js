import axios from 'axios'
const BASE_URL ="https://dantr-booking-v1.vercel.app/api"
export const axiosRequest = axios.create({
    baseURL:BASE_URL
})