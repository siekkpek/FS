import Part from './Part'
const Content = (props) => {
        return (
          props.course.parts.map(part =>
            <div key={part.id}>
              <Part part={part}/>
            </div>)
         )
        }

export default Content
