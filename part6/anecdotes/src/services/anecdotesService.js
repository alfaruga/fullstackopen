import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  //for JSON srver, send them as objects with the same  keys as in the DB
  const sendObject = { content: content, votes: 0 };
  const response = await axios.post(baseUrl, sendObject);
  console.log("response from server:", response.data);
  return response.data;
};

const vote = async (anecdote) => {
  const response= await axios.put(baseUrl + `/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });

  return response.data
};

const anecdotesService = { getAll, createNew, vote }
export default  anecdotesService
