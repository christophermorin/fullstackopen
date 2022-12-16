import { useState } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const get = async () => {
    const response =await axios.get(`${baseUrl}`)
    setResources(response.data)
    return response.data
  }

  const create = async (resource) => {
    const response = await axios.post(`${baseUrl}`, resource)
    setResources(prevResource => [...prevResource, response.data])
    return response.data
  }

  const service = {
    create,
    get
  }

  return [
    resources, service
  ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}