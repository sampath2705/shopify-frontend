import axios from "axios";

const api = axios.create({
 baseURL: "https://shopify-backend-u5pt.onrender.com/"
});

export default api;
