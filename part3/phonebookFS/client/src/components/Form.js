const Form = ({ submit, getName, getNumber, nameVal, numberVal }) => {
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <span>Add Name: </span>
          <input value={nameVal} onChange={getName} required />
        </div>
        <div>
          <span>Add Number: </span>
          <input value={numberVal} onChange={getNumber} required />
        </div>
        <div>
          <button type="submit">Create Entry</button>
        </div>
      </form>
    </div>
  );
};

export default Form;