import { useState } from "react";

export const useForm = (type) => {
  const [value, setValue] = useState('')
  
  const onChange = (event) => {
    const value = event.target.value
    setValue(value)
  }

  const reset = () => {
    setValue('')
  }
  
  return {
    reset,
    type,
    value,
    onChange,
    
  }
}