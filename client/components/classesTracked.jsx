import React from 'react'

function ClassesTracked(props) {
    const trackedClasses =  props.courses.map(course => {
      let info = {
        name: course.name,
        number: course.number,
        id: course.id,
        section: !!course.section
      }

      console.log(info)
      let courseInfo = JSON.stringify(info);
      return <div > 
                <div className="tracked"> {course.number} : {course.name} </div>
                <button type="button" className="btn btn-primary btn-sm" id="block" data-courseinfo = {courseInfo} onClick={props.untrack}> Untrack </button>
             </div>
    })
    return (
        <div id="fill" className="scroll" >
          {trackedClasses}
        </div>
    )
}


export default ClassesTracked
