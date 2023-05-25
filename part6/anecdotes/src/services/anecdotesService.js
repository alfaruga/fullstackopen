import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  //for JSON srver, send them as objects with the same  keys as in the DB
  const sendObject = {"content":content, "votes":0}
  const response = await axios.post(baseUrl, sendObject);
  return response.data;
};
export default { getAll, createNew };
