import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getAll = () => {
  return axios.get(`${baseUrl}/api/persons`)
}

const getPerson = (id) => {
  return axios.get(`${baseUrl}(api/persons/${id}`)
}

const create = newObject => {
  return axios.post(`${baseUrl}/api/persons`, newObject)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/api/person/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/api/person/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  getPerson: getPerson,
  create: create, 
  deletePerson: deletePerson,
  update: update,
}