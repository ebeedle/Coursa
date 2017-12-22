import React from 'react'

function ClassesTracked(props) {
    const trackedClasses =  props.courses.map(course => {
      let info = {
        name: course.name,
        number: course.number,
        id: course.id,
        section: !!course.section
      }
      let courseInfo = JSON.stringify(info);
      return <div> {course.number} : {course.name} <button type="button" className="btn btn-primary btn-sm" id="block" data-courseinfo = {courseInfo} onClick={props.untrack}> Untrack </button></div>
    })
    return (
        <div>
          {trackedClasses}
        </div>
    )
}


export default ClassesTracked
