import React from 'react';
import AvailableClassTypes from './availableClassTypes.jsx';
import ContainerHeading from './ContainerHeading.jsx';
import TrackableSections from './trackableSections.jsx';
import ClassesTracked from './classesTracked.jsx'

function sortElements(elements, onClick, type) {
  let className = 'element';
  if (type === 'Course Types') {
    className += ' code'
  } else if (type === 'Courses') {
    className += ' course'
  }

  if (type === 'Course Types') {
    return elements.map((element, index) => {
      return <div key={index} onClick={() => {onClick(element)}} className={className}> {element} </div>
    })
  } else {
    let sortedElements = elements.sort((a, b) => {
    return a.name.localeCompare(b.name);
    })
    return sortedElements.map((element, index) => {
      return <div key={index} onClick={() => {onClick(element)}} className={className}> {element.name} </div>
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
      <ContainerHeading heading={props.type} />
      {props.type === 'Sections' ? (
          <TrackableSections tracked={props.tracked} sections={props.sections} trackCourse={props.trackCourse} untrackCourse={props.untrackCourse} />
      ) : props.type === 'Currently Tracking' ? (
        <ClassesTracked courses={props.courses} untrack={props.untrack}/>
      ) : (
        <div id="fill" className="scroll" multiple size="3" >
          {divElements}
        </div>
      )
    } 
    </div>
  )
}


export default Container;