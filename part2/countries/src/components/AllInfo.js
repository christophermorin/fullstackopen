import axios from "axios"
import { useState, useEffect } from "react"

const AllInfo = (props) => {
    const [weather, setWeather] = useState({
        temp: 0,
        speed: 0,
        icon: ''
    })

    const api_key = process.env.REACT_APP_WEATHER_KEY
    const [lat, lon] = props.info.capitalInfo.latlng

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(res => {
            console.log(res.data)
            setWeather({
                temp: res.data.main.temp,
                speed: res.data.wind.speed,
                icon: res.data.weather[0].icon,
                description: res.data.weather[0].description
            })
        })
    },[lat,lon])

    console.log(props.info.name.official)
    const langOut = Object.values(props.info.languages)
    const languages = langOut.map(lang => <li key={lang}>{lang}</li>)
    const {svg} = props.info.flags 

    return (
        <div>
            <h2>{props.info.capital}</h2>
            <p>{props.info.area}</p>
            <h3>Languages</h3>
                <ul>
                    {languages}
                </ul>
            <img src={svg} width="200" alt={`${props.info.name.official} Flag`}/>
            <h3>Weather in {props.info.capital}</h3>
           
            <ul>
                <li>Temperature: {Math.floor(weather.temp - 273.15)} Celcius</li>
                <li>
                    {weather.icon ?
                    <img 
                        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}/> 
                    : '' }
                </li>
                <li>Wind: {weather.speed} m/s</li> 
            </ul> 
        </div>
    )
}

export default AllInfo



// Capital
// Area
// Languages
// Flag
// Weather in Capital
    //temp
    //img
    //wind