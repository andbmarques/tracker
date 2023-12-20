import axios from "axios";

const api = axios.create({
    baseURL: "https://tracker-api-eta.vercel.app"
})

export default api;