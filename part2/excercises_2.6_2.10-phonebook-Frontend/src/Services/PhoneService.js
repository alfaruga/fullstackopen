import axios from "axios";

const baseUrl = "/api/persons";

const retrieve = () => axios.get(baseUrl); //retrieves the full database

const create = (phoneNumber) => {
  return axios.post(baseUrl, phoneNumber); //post to DB and returns the posted object only
};

const deleteNumber = (id) => {
  return axios.delete(`${baseUrl}/${id}`); // deletes and returns an empty object
};
const update = (id, phoneNumber) => {
  return axios
    .put(`${baseUrl}/${id}`, phoneNumber)
   
};


const exp = {
  create,
  retrieve,
  deleteNumber,
  update,
}
export default exp;
