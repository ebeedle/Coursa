import React from 'react';
import CheckBox from './checkbox.jsx';

function TrackableSections(props) {
  // console.log('tracked courses in tsections :', props.tracked)
  
  const isCurrentlyTracking = (tracked, section) => {
    for (let i = 0; i < tracked.length; i++) {
      let trackedCourse = tracked[i];
      // console.log(section.name, ' ', trackedCourse.name, 'ids equal :', trackedCourse.id === section.id,  'seections equal :', !!trackedCourse.section === !section.isNotSection, 'sections section status :', section)
      if (trackedCourse.id == section.id && !!trackedCourse.section === !section.isNotSection) {
        return true;
      }
    }
    //true 
    // console.log('not tracking :', section.name);
    // console.log('section :', section, 'tracked :', tracked);
    // console.log('sections is a discussion :', !section.isNotSection, 'tracked :', tracked)
    return false;
  }


  let sections = props.sections;
  // console.log('sections :', sections)
  let sortedSections = sections.sort((a, b) => {
    return a.name.localeCompare(b.name);
  })
  let sectionElements = sortedSections.map(sect => {
    // console.log('sect :', sect, 'sect id :', sect.id);
    let isTracking = isCurrentlyTracking(props.tracked, sect);
    // console.log('sect :', sect, 'props.tracked :', props.tracked)
    // console.log('is Tracking :', isTracking, 'name :', sect.name)
    // console.log('sect :', sect)
    // let isSect = !sect.isNotSection;
    // console.log('is sect :', isSect)
    return (
      <div className='code cf'> 
        <div className="checkbox" > <CheckBox trackCourse={props.trackCourse} untrackCourse={props.untrackCourse} isTracking={isTracking} id={sect.id} isNotSect={sect.isNotSection} /> </div>
        <div className="section_name"> {sect.name} </div>
      </div>
    )
  })

  return (
    <div className="section_container">
      <div>
      {sectionElements}
      </div>
    </div>
  )
}

export default TrackableSections;