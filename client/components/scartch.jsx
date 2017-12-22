displayCourses(data) {
  if (!this.props.currentCourses.length) {
    data = this.props.codes;
  }
  console.log('data :', data);
    return <AvailableClassTypes cat={this.props.currentCode} onClick2={this.addFilteredCourse} onClick={this.filterCoursesByType} codes={data} filtered={this.props.filtered}/>
}


render() {
  return (
    <div className="compartment">
        {this.displayCourses(this.props.currentCourses)}
        {this.state.currentCode !== null ? (
          <div className="back" onClick={this.handleClickBack}> BACK </div>
        ) : (
          <div className="back"> </div>
        )
        }

    </div>
  )
}