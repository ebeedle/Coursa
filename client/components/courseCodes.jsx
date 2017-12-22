import React from 'react';
import AvailableClassTypes from './availableClassTypes.jsx';


function CourseCodes(props) {
  let codes = props.codes;
  let codeElements = codes.map(code => {
    return <div onClick={() => {props.onClick(code)}} className='code'> {code} </div>
  })
  //get codes from props
  //get onclick property from props
  //map through codes, assigin each one a div and onclick properties

  return (
    <div className='codes'>
      <div className="select"> Select A Course Type: </div>
      {codeElements}
    </div>
  )
}


export default CourseCodes;