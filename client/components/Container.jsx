import React from 'react';
import AvailableClassTypes from './availableClassTypes.jsx';
import Heading from './heading.jsx';
import TrackableSections from './trackableSections.jsx';
import ClassesTracked from './classesTracked.jsx'

function sortElements(elements, onClick, type) {
  if (type === 'Course Types') {
    return elements.map((element, index) => {
      return <option key={index} onClick={() => {onClick(element)}} className='element'> {element} </option>
    })
  } else {
    let sortedElements = elements.sort((a, b) => {
    return a.name.localeCompare(b.name);
    })
    return sortedElements.map((element, index) => {
      return <option key={index} onClick={() => {onClick(element)}} className='element'> {element.name} </option>
    })
  }
}

// function sortSections()

//pass in sections
//pass in currently tracked

//

function Container(props) {
  let elements = props.elements;
  console.log('elemtns :', elements)
  let divElements;
  if (elements) {
    divElements = sortElements(elements, props.onClick, props.type)    
  }
  
  return (
    <div className="border">
      <Heading heading={props.type} />
      {props.type === 'Sections' ? (
          <TrackableSections tracked={props.tracked} sections={props.sections} trackCourse={props.trackCourse} untrackCourse={props.untrackCourse} />
      ) : props.type === 'Currently Tracking' ? (
        <ClassesTracked courses={props.courses} untrack={props.untrack}/>
      ) : (
        <select id="fill" multiple size="3" >
          {divElements}
        </select>
      )
    } 
    </div>
  )
}


export default Container;