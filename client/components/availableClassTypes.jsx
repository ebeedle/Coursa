import React from 'react';

class AvailableClassTypes extends React.Component {
  handleClick(code) {
    if (this.props.filtered) {
      // this.onClick2(code, )
      this.props.onClick2(this.props.cat, code)
    } else {
      this.props.onClick(code)
    }
  }
  render() {
    console.log("thispops :", this.props)
    let courseInfo;
    if (!this.props.filtered) {
      courseInfo = this.props.codes;
    } else {
      courseInfo = this.props.codes.map(course => {
        return course.name;
      })
    }


    console.log('coursinfo :', courseInfo)
    console.log('filterd ?', this.props.filtered)
    let sortedCodes = courseInfo.sort((a, b) => {
      return a.localeCompare(b)
    })
    const codes = sortedCodes.map(code => {
      return <div onClick={() => {this.handleClick(code)}} className='code'> {code} </div>
    })
    return (
      <div className='codes'> {codes} </div>
    )
  }
}

export default AvailableClassTypes;