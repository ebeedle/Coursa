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
  let sectionElements = sortedSections.map(sect => {
    let isTracking = isCurrentlyTracking(props.tracked, sect);
    return (
      <div className='cf element'> 
        <div className="left cb"> <CheckBox trackCourse={props.trackCourse} untrackCourse={props.untrackCourse} isTracking={isTracking} id={sect.id} isNotSect={sect.isNotSection} /> </div>
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