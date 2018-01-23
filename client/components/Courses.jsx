import React from 'react';

function Courses(props) {
  let courses = props.courses;
  let sortedCourses = courses.sort((a, b) => {
    return a.name.localeCompare(b.name);
  })
  let courseElements = sortedCourses.map(course => {
    return <div onClick={() => {props.onClick(course)}} className='code'> {course.name} </div>
  })
  if (!courseElements.length) {
    return null;
  } else {
    return (
      <div className='codes'>
      <div className="select"> Select A Lecture: </div>
      <div> {courseElements} </div>
      </div>
    )
    
  }
}

export default Courses;