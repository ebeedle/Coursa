import React from 'react';
import TrackableSections from './trackableSections.jsx'

function Sections(props) {
  let sections = props.sections;
  let sortedSections = sections.sort((a, b) => {
    return a.name.localeCompare(b.name);
  })
  let sectionElements = sortedSections.map(sect => {
    return <div onClick={() => {props.onClick(sect.id, !sect.isNotSection)}} className='code'> {sect.name} </div>
  })
  let lecture;
  if (!sections.length) {
    return null;
  } else if (sections.length && !sections[0].isNotSection) {
    lecture = props.currentCourse.name;
    return (
      <div className="section_cont">
        <div className="select mobile"> Select A Section To Track </div>
        <div className="lecture"> {lecture} </div>
        <TrackableSections tracked={props.tracked} sections={props.sections} trackCourse={props.trackCourse} untrackCourse={props.untrackCourse} />
      </div>
    )
  } else {
    return (
      <div className="section_cont">
        <div className="select mobile"> Select A Section To Track </div>
        <TrackableSections tracked={props.tracked} sections={props.sections} trackCourse={props.trackCourse} untrackCourse={props.untrackCourse}/>
      </div>
    )
  }
}


export default Sections;