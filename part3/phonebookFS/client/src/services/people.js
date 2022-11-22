import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
        return req.then(res => res.data)
}

const addPerson = (newPerson) => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(res => console.log(res))
}

const deletePerson = (id) => {
    console.log(id)
    const req = axios.delete(`${baseUrl}/delete/${id}`)
    return req.then(res => console.log(`Post ${id} deleted`))
}

const updatePerson = (id, newNumber) => {
    const req = axios.put(`${baseUrl}/${id}`, newNumber)
    return req.then(res => res.data)
}
export default {getAll, addPerson, deletePerson, updatePerson}
