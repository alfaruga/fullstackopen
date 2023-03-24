import axios from "axios";
const baseUrl = "http://localhost:3001/";


const login = async (credentials) => {
  console.log("reaches sevices")
  const response = await axios.post(baseUrl + 'api/login', credentials);
  return response.data;
};

export default  {login} ;
