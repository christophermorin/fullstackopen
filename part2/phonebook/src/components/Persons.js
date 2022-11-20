const Persons = ({persons, filtered}) => {
let id = () => Math.random() * 100
const people = persons.map(person => <p key={id()}>{person.name} : {person.number}</p>)

const listAfterFilter = filtered.map(person => <p key={id()}>{person.name} : {person.number}</p>)

    return (
        <>
            {listAfterFilter.length > 0 ? listAfterFilter : people}
        </>
    )
}

export default Persons