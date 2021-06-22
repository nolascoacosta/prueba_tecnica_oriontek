import axios from "axios";
export const getSocialAuthLinks =  async () => {
   return await Promise.all([
    axios.get("http://localhost:8000/api/v1/auth/social/google").then(response => response.data).then(data => data.url),
    axios.get("http://localhost:8000/api/v1/auth/social/facebook").then(response => response.data).then(data => data.url)
  ]);
}