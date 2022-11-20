import { useState } from "react"
import AllInfo from "./AllInfo"

const Country = ({info}) => {

    const [displayAll, setDisplayAll] = useState(false)

    const displayAllInfo = () => {
        setDisplayAll(!displayAll)  
    }

    const label = displayAll ? 'Close' : 'More Info'

    return (
        <li>
            {info.name.official} <button onClick={displayAllInfo}>{label}</button>
            {displayAll ? <AllInfo info={info} /> : ''}
        </li>
    )
}

export default Country