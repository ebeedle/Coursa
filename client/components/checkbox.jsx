  import React from 'react';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
  }
  //pass down class ids
  toggle() {
    if (this.props.isTracking) {
      this.props.untrackCourse(this.props.info.id, this.props.isSect)
    } else {
      this.props.trackCourse(this.props.info.id, this.props.info.name, this.props.info.number, this.props.isSect)
    }
  }
  render() {
    console.log('is a section :', this.props.isNotSect)
    // console.log('isTracking :', this.props.isTracking, 'id :', this.props.id, 'is Sect :', this.props.isSect)
    const checkbox = (
           <input 
           id="checkbox"
           type="checkbox"
           checked={this.props.isTracking}
           onClick={this.toggle.bind(this)}
           />
    );

    return checkbox;
  }
}

export default CheckBox;