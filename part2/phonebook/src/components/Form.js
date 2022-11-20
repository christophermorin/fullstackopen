const Form = ({submit, getName, getNumber, nameVal, numberVal}) => {
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                  name: <input value={nameVal} onChange={getName} />
                </div>
                <div>
                  number: <input value={numberVal} onChange={getNumber} />
                </div>
                <div>
                  <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form