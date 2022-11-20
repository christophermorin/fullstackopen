const Search = (props) => {
    return (
        <div>
            <input value={props.value} onChange={props.handleChange} />
        </div>
    )
}

export default Search