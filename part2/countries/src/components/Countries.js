import Country from "./Country"

const Countries = (props) => {
    
    const country = props.countries.map(country => {
        return (
            
            <Country key={country.area}info={country}/>
        )
    })

    return (
        <ul>
            {country.length > 0 ? country : 'Please be more specific'}
        </ul>
    )
}

export default Countries