import axios from "axios";

const restClient = axios.create({
  baseURL: "http://localhost:3030", // adjust if needed
  withCredentials: true, // optional, if using cookies or session
});

export default restClient;
