import React from 'react';

const ProspectiveCourse = ({courseInfo, onTrack, onCancel}) => {
  let courseName = courseInfo.name;
  let courseNumber = courseInfo.number;
  return (
    <div className="prospective-course">
      <div className="prospective-course-message">
        <div className="track-message">
          <div style={{fontSize : '20px'}} >Are you sure you want to track {courseName} (Course Number: #{courseNumber})?</div>
          <div style={{fontSize : '12px'}} >You will recieve a text message when the course changes to open or waitlist </div>
        </div>
        <div className="pc-buttons">
          <button className="btn btn-primary margin-small" onClick={onTrack} > Track </button>
          <button className="btn btn-primary margin-small" onClick={onCancel} > Cancel </button>
        </div>
      </div>
    </div>
  )
}

export default ProspectiveCourse;