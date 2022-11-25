import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
        return req.then(res => res.data)
}

const addPerson = (newPerson) => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(res => res.data)
}

const deletePerson = (id) => {
    const req = axios.delete(`${baseUrl}/delete/${id}`)
    return req.then(res => console.log(`Post ${id} deleted`))
}

const updatePerson = (id, updatedPerson) => {
    const req = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return req.then(res => res.data)
}
export default {getAll, addPerson, deletePerson, updatePerson}
