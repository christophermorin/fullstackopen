const Persons = ({ persons, filtered, deleteEntry }) => {
  const people = persons.map((person) => (
   
    <div key={person.id}>
      <p>
        {person.name} :{person.number}
      </p>
      <button onClick={() => deleteEntry(person.id)}>Delete</button>
    </div>
  ));
  const listAfterFilter = filtered.map((person) => (
    <div key={person}>
      <p>
        {person.name} :{person.number}
      </p>
      <button onClick={() => deleteEntry(person.id)}>Delete</button>
    </div>
  ));
  
  return <>{listAfterFilter.length === 0 ? people  : listAfterFilter}</>;
};

export default Persons;
