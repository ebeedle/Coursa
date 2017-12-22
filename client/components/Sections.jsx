import React from 'react';
import TrackableSections from './trackableSections.jsx'

function Sections(props) {
  // console.log('traccked in sectionssss :', props.trackedCourses)
  // console.log('props :', props.jake)
  let sections = props.sections;
  // console.log('sections :', sections)
  let sortedSections = sections.sort((a, b) => {
    return a.name.localeCompare(b.name);
  })
  let sectionElements = sortedSections.map(sect => {
    // console.log('sect :', sect, 'sect id :', sect.id);
    return <div onClick={() => {props.onClick(sect.id, !sect.isNotSection)}} className='code'> {sect.name} </div>
  })
  let lecture;
  if (!sections.length) {
    return null;
  } else if (sections.length && !sections[0].isNotSection) {
    // console.log('is not section :', !sections[0])
    //lecture has at least one discussion section
    lecture = props.currentCourse.name;
    return (
      <div className="section_cont">
        <div className="select mobile"> Select A Section To Track </div>
        <div className="lecture"> {lecture} </div>
        <TrackableSections tracked={props.tracked} sections={props.sections} trackCourse={props.trackCourse} untrackCourse={props.untrackCourse} />
      </div>
    )
  } else {
  //map through sections to get names of sections in div elements
    return (
      <div className="section_cont">
        <div className="select mobile"> Select A Section To Track </div>
        <TrackableSections tracked={props.tracked} sections={props.sections} trackCourse={props.trackCourse} untrackCourse={props.untrackCourse}/>
      </div>
    )
  }
}

//if lecture has associated sections, show lecture and 
  //associated sections
//otherwise, just show lecture


export default Sections;