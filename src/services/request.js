import axios from "axios";

// Set config defaults when creating the instance
 const instance = axios.create({
    baseURL: 'https://localhost:44342/api/'
  });
  
  export default instance
 