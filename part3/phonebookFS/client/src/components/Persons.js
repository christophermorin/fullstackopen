const Persons = ({ persons, filtered, deleteEntry }) => {
  console.log(persons);
  const people = persons.map((person) => (
    <div key={person.id}>
      <p>
        {person.name} :{person.number}
      </p>
      <button onClick={() => deleteEntry(person.id)}>Delete</button>
    </div>
  ));

  const listAfterFilter = filtered.map((person) => (
    <div key={person.id}>
      <p>
        {person.name} :{person.number}
      </p>
      <button onClick={() => deleteEntry(person.id)}>Delete</button>
    </div>
  ));

  return <>{listAfterFilter.length > 0 ? listAfterFilter : people}</>;
};

export default Persons;
