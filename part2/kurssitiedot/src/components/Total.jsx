const Total = (props) => {
        
        const total_number = props.course.parts.reduce((total_number, part) => {
          return total_number + part.exercises
        }, 0)
        return (
          <p>
            Total of {total_number} exercises
          </p> 
          
        )
      }

export default Total
