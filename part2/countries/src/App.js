import axios from 'axios'
import {useState, useEffect} from 'react'
import Search from "./components/Search";
import Countries from './components/Countries';



function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    if(search){
    axios.get(`https://restcountries.com/v3.1/name/${search}`)
    .then(res => {
      if(res.data.length <= 10){
        setCountries(res.data)
      }else{
        setCountries([])
      }
    })
  }
  },[search])

  return (
    <div>
      <Search handleChange={handleChange} value={search}/>
      <Countries countries={countries}/>
    </div>
  );
}

export default App;
