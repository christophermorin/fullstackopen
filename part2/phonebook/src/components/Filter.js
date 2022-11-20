const Filter = (props) => {
  return (
    <div>
      <span>Search: </span>
      <input name="filter" onChange={props.filter} />
    </div>
  );
};

export default Filter;