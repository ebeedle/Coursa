 import React from 'react';
 import ReactDom from 'react-dom';
 import $ from 'jquery';
 import ClassesTracked from './classesTracked.jsx' ;
 import Container from './Container.jsx';
 import Courses from './Courses.jsx';
 import Sections from './Sections.jsx';
 import NavBar from './NavBar.jsx';
 import Logout from './Logout.jsx';
 import ProspectiveCourse from './ProspectiveCourse.jsx';
 import { BrowserRouter as Route, Redirect} from 'react-router-dom'


class Home extends React.Component {
  constructor(props) {
    console.log('homne loading');

    //<Sections tracked={this.state.trackedCourses} sections={this.state.sections} currentCourse={this.state.currentCourse} untrackCourse={this.untrack} trackCourse={this.handleSectionSelect} />
    //codes ~ lecture codes (i.e 'CHEM')
    //courses ~ lectures (i.e. 'CHEM 101')
    //sections ~ discussion sections/labs (i.e. 'CHEM 101 LAB 2')

//     sd
// <div className="tracked quarter">
// <div className="tracking">
// <div className="currently-tracking"> Classes You Are Currently Tracking: </div>
// <ClassesTracked courses={this.state.trackedCourses} untrack={this.untrackCourse} />
// </div>
// </div>
//{id: 1611, name: "ANTHRO 123A 001 LEC 001", number: 31958, isSection: true}
    super(props);
    this.state = {
      codes: [],
      courses: [],
      sections: [],
      trackedCourses: [],
      currentCourse: null,
      loggedIn: true,
      prospectiveCourse: null
    }

    this.handleCodeSelect = this.handleCodeSelect.bind(this);
    this.handleCourseSelect = this.handleCourseSelect.bind(this);
    this.untrack = this.untrack.bind(this);
    this.handleSectionSelect = this.handleSectionSelect.bind(this);
    this.untrackCourse = this.untrackCourse.bind(this); 
    this.addCourseToTracked = this.addCourseToTracked.bind(this);
    this.throwError = this.throwError.bind(this);
    this.clearProspectiveCourse = this.clearProspectiveCourse.bind(this);
    this.trackCourse = this.trackCourse.bind(this);
  }

  componentDidMount() {
    $.get('/courseCodes')
    .done(codes => {
      this.setState({
        codes: codes
      })
    })
    .fail(() => {
      console.log('couldnt get codes');
      this.throwError()
    })
    $.get('/trackedCourses')
    .done(data => {
      let trackedCourses = JSON.parse(data);
      this.setState({
        trackedCourses: trackedCourses,
      })
    })
    .fail(() => {
      console.log('couldnt get tracked courses')
      this.setState({loggedIn: false})
      this.throwError()
    })
  }

  deleteActiveClass(type) {
    console.log('deleting active class')
    let codeElements;
    if (type === 'code') {
      codeElements = $('.code');
    } else {
      codeElements = $('.course');
    }
    
    for (let i = 0; i < codeElements.length; i++) {
      let current = codeElements.eq(i);
      if (current.hasClass('active')) {
        current.removeClass('active')
      } 
    }
  }

  addActiveClass(type, match) {
    let codeElements;
    if (type === 'code') {
      codeElements = $('.code');
    } else {
      codeElements = $('.course');
    }

    for (let i = 0; i < codeElements.length; i++) {
      let current = codeElements.eq(i);
      if (current.text().trim() === match) {
        current.addClass('active');
      }
    }
  }

  handleCodeSelect(code) {
    $.get('/coursesByCode', {code: code})
    .done(courses => {
      this.setState({
        courses: courses,
        sections: []
      })
    })
    .fail(() => this.throwError())
    
    this.deleteActiveClass('course')
    this.deleteActiveClass('code');
    this.addActiveClass('code', code)

    
    //iterate through codes elements
      //remove highlight classs
    //iterate through elements
      //highight class
  }

  handleCourseSelect(courseInfo) {
    console.log('course info :', courseInfo)
    $.get('/sections', {id: courseInfo.id})
    .done(sections => {
      this.setState({
        currentCourse: courseInfo,
        sections: sections
      })
    })
    .fail(() => this.throwError())

    this.deleteActiveClass('course');
    this.addActiveClass('course', courseInfo.name)


  }
  
  handleSectionSelect(id, name, number, isSection) {
    //check to see if there are any errors
    console.log('isSection :', isSection)
    this.setState({
      prospectiveCourse : {
        id: id,
        name: name,
        number: number,
        isSection: isSection
      }
    })
  }

  trackCourse() {
    if (!this.state.prospectiveCourse) {
      alert('error: no course selected');
      return false;
    }
    let id = this.state.prospectiveCourse.id;
    let isSection = this.state.prospectiveCourse.isSection;
    let endpoint = isSection ?  "/trackSection" : "/trackCourse";
    $.post(endpoint, {id: id})
        .done(data => {
          $('.errors').empty();
          var data = JSON.parse(data);
          var status = data.status;
          if (status !== true) {
            this.throwError(status);
          } else {
            //create pop up
              //on pop up click yes : callAddCourseToTracked
              //set state for prospective course to be {data, isSection}
            this.addCourseToTracked(data, isSection);
          }
        })
        .fail(() => this.throwError())
  }
  
  throwError(status) {
    //set state to prospective course = 
    this.setState({
      prospectiveCourse: null
    }, () => {
      if (status === 'invalid') {  
        $('.errors').append(`<div> The course number entered is invalid </div>`)
      } else if (status === 'tracking') {
        $('.errors').append(`<div> You are already tracking this course </div>`)
      } else if (status === 'tracking too many courses') {
        $('.errors').append(`<div> You are already tracking the maximum of 10 courses </div>`)
      } else {
        $('.errors').append(`<div> An error occured</div>`)
      }
      //then scroll to bottom of page so user sees error
      $('html, body').animate({scrollTop:$(document).height()}, 'slow');
    }
      
    )
  }

  addCourseToTracked(data, isSection) {
    var tracked = this.state.trackedCourses.slice();
    tracked.push({name: data.courseName, number: data.courseNumber, id: data.courseId, section: !!isSection});
    this.setState({
      trackedCourses: tracked,
      prospectiveCourse: null
    })
  }
  untrackCourse(event) {
    var courseInfo = JSON.parse(event.target.dataset.courseinfo);
    let id = courseInfo.id;
    let isSection = !!courseInfo.section;
    this.untrack(id, isSection);
  }

  untrack(id, isSection) {
    console.log('trying to untrack')
    this.clearErrors();
    $.post( "/untrack", { courseID: id, isSection: isSection})
    .done(data => {
      let tracked = this.state.trackedCourses.slice();
      for (var i = 0; i < tracked.length; i++) {
        var course = tracked[i];
        if (+course.id === +id) {
          tracked.splice(i, 1);
        }
      }
      this.setState({
        trackedCourses: tracked
      })
    })
    .fail(() => this.throwError())
  }

  clearProspectiveCourse() {
    this.setState({
      prospectiveCourse: null
    })
  }

  // track() {
  //   this.
  // }

  clearErrors() {
    $('.errors').empty();
  }

  render() {
    // console.log('tracked :',  this.state.trackedCourses);
    console.log('this.prosp: ', this.state)
    if (this.state.loggedIn === false) {
      return <Redirect to="/login" />;
    }

    //if prospective course.length
      //return this pass in onclick property
    //else return this...
  	return (
      <div>
      {this.state.prospectiveCourse ? (
        <ProspectiveCourse courseInfo={this.state.prospectiveCourse} onCancel={this.clearProspectiveCourse} onTrack={this.trackCourse} />) : <span> </span>
      }
      <NavBar additions={['', 'logout']}/>
      <div className="padding-top container full-width">
        <div className="message"> Select your course below to get a text when your class opens up! </div>
    	  <div className="cf" onClick={this.clearErrors}>
          <div className="float">
            <div className="quarter">
              <Container type="Course Types" elements={this.state.codes} onClick={this.handleCodeSelect}/>
            </div>
            <div className="quarter">
              <Container type="Courses" elements={this.state.courses} onClick={this.handleCourseSelect}/>
            </div>
          </div>
          <div className="float">
            <div className="quarter"> 
              <Container type="Sections" tracked={this.state.trackedCourses} sections={this.state.sections} currentCourse={this.state.currentCourse} untrackCourse={this.untrack} trackCourse={this.handleSectionSelect} />
            </div>
            <div className="quarter"> 
              <Container type="Currently Tracking" courses={this.state.trackedCourses} untrack={this.untrackCourse} />
            </div>
          </div>
        </div>
            <div className="errors"> </div>
        </div>  
      </div>
	  )
  }
}

 export default Home;