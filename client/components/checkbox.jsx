  import React from 'react';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
  }
  //pass down class ids
  toggle() {

    if (this.props.info.isTracking) {
      this.props.untrackCourse(this.props.info.id, this.props.info.isSect)
    } else {
      this.props.trackCourse(this.props.info.id, this.props.info.name, this.props.info.number, this.props.info.isSect)
    }
  }
  render() {
    console.log('info :', this.props.info);
    // console.log('is a section :', this.props.info.isSect)
    // console.log('isTracking :', this.props.isTracking, 'id :', this.props.id, 'is Sect :', this.props.isSect)
    const checkbox = (
           <input 
           id="checkbox"
           type="checkbox"
           checked={this.props.info.isTracking}
           onClick={this.toggle.bind(this)}
           />
    );

    return checkbox;
  }
}

export default CheckBox;