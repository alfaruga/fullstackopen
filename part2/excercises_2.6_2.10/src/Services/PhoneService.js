import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const retrieve = () =>
  axios.get(baseUrl).then((response) => response.data);

const post = (phoneNumber) => {
  return axios.post(baseUrl, phoneNumber).then((response) => response.data);
};

const deleteNumber = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(() => {
    retrieve()})
};
const update = (id, phoneNumber) =>{
    return axios.put(`${baseUrl}/${id}`, phoneNumber).then(response=>response.data)
}
export default { post: post, retrieve: retrieve, deleteNumber: deleteNumber, update:update };
