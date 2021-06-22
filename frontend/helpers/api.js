import Axios from 'axios';
import cookie from "js-cookie";
const api = Axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
})

export default api;