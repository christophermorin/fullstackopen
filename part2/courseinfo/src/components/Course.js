const Header = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    const {name, exercises} = props.part
    return (
      <div>
        <p>{name} {exercises}</p>
      </div>
    )
  }
  
  const Content = (props) => {
    const parts = props.part.map(el => {
        return (
            <Part key={el.id} part={el} />
        )
    })
    return (
      <>
        {parts}
      </>
    )
  }
  
  const Total = (props) => {
    let totalExercises = props.part.reduce((a,b) => a + b.exercises,0)
    return (
      <div>
        <p>Number of exercises {totalExercises}</p>
      </div>
    )
  }

const Course = (props) => {
    return(
        <div>
            <Header name={props.course.name} />
            <Content part={props.course.parts} />
            <Total part={props.course.parts} />
        </div>
    )
}

export default Course