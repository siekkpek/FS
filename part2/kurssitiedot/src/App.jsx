import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

 /*   const Header = (props) => {
      return (
        <div>
          <h2> {props.course.name} </h2>
        </div>
       )
      }*/
    
/*      const Content = (props) => {
        return (
          props.course.parts.map(part =>
            <div key={part.id}>
              <Part part={part}/>
            </div>)
         )
        }*/
    
       /* const Part = (props) => {
          return (
            <p>           
              {props.part.name} {props.part.exercises} 
            </p>
          )
        }*/

      const Courses = (props) => {
        return (
          props.courses.map(course => (
            <div key={course.id}>
              <Course course={course}/>
            </div>)
          )
        )
      }

     /* const Course = (props) => {
        return (
          <>
            <Header course={props.course}/>
            <Content course={props.course}/>
            <Total course={props.course}/>
          </>
        )
      }*/

 /*     const Total = (props) => {
        
        const total_number = props.course.parts.reduce((total_number, part) => {
          return total_number + part.exercises
        }, 0)
        return (
          <p>
            Total of {total_number} exercises
          </p> 
          
        )
      }*/
  
    return (
      <div>
        <h1>Web development curriculum</h1>
        <Courses courses={courses}/>
      </div>
    )
  }
  
  export default App