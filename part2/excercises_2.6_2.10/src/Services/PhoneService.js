import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const retrieve = () => axios.get(baseUrl).then((response) => response.data); //retrieves the full database

const create = (phoneNumber) => {
  return axios.post(baseUrl, phoneNumber).then((response) => response.data); //post to DB and returns the posted object only
};

const deleteNumber = (id) => {
  return axios.delete(`${baseUrl}/${id}`); // deletes and returns an empty object
};
const update = (id, phoneNumber) => {
  return axios
    .put(`${baseUrl}/${id}`, phoneNumber)
    .then((response) => response.data); //Changes an already posted objct and returns the
  //new modified object
};


const exp = {
  create,
  retrieve,
  deleteNumber,
  update,
}
export default exp;
