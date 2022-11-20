const Filter = (props) => {
    return (
        <div>
            <input name="filter" onChange={props.filter} />
        </div>
    )
}

export default Filter