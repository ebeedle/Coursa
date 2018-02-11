import React from 'react';
import CheckBox from './checkbox.jsx';

function TrackableSections(props) {
  
  const isCurrentlyTracking = (tracked, section) => {
    for (let i = 0; i < tracked.length; i++) {
      let trackedCourse = tracked[i];
      if (trackedCourse.id == section.id && !!trackedCourse.section === !section.isNotSection) {
        return true;
      }
    }
    return false;
  }

  let sections = props.sections;
  let sortedSections = sections.sort((a, b) => {
    return a.name.localeCompare(b.name);
  })
  console.log('sections :', sortedSections)
  let sectionElements = sortedSections.map(sect => {
    // console.log('sect :', sect)
    let isTracking = isCurrentlyTracking(props.tracked, sect);
    // console.log('sect :', sect)
    let info = {
      id: sect.id,
      isSect: !sect.isNotSect,
      isTracking: isTracking,
      name: sect.name,
      number: sect.number
    }
    console.log('available sections :', info)
    return (
      <div className='cf element'> 
        <div className="left cb"> <CheckBox trackCourse={props.trackCourse} untrackCourse={props.untrackCourse} info={info} /> </div>
        <div className="section-name"> {sect.name} </div>
      </div>
    )
  })

  return (
    <div id="fill" className="scroll" >
      {sectionElements}
    </div>
  )
}

export default TrackableSections;