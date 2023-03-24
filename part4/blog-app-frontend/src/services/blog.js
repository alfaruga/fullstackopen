import axios from "axios";
const baseUrl = "http://localhost:3001/";

const getBlogs = async () => {
  const response = await axios.get(baseUrl+'api/blogs');
  return response.data
};

export default { getBlogs };
