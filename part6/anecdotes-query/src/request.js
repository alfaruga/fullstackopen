import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";
export const getAnecdotes = () => {
  return axios.get(baseUrl).then((r) => r.data);
};

export const createAnecdote = (anecdoteObject) => {
  return axios.post(baseUrl, anecdoteObject).then((r) => r.data);
};

export const vote = (editedAnecdote)=>{
    return axios.put(`${baseUrl}/${editedAnecdote.id}`, editedAnecdote).then(r=>r.data)
}