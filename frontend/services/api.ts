import axios from "axios";

const BASEAPI_URL = `${process.env.NEXT_PUBLIC_BASEAPI_URL}`;

const api = axios.create({
  baseURL: BASEAPI_URL,
});

export default api;