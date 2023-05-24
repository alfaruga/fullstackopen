import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(baseUrl, newObject, config);
  return response;
};

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(baseUrl + "/" + id, config);
};

const updateBlog = async (id) => {
  const updatedBlog = await axios.put(baseUrl + "/" + id);
  return updatedBlog;
};

const modules = { getAll, create, setToken, deleteBlog, updateBlog };
export default modules
