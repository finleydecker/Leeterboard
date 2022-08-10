import React, { Component } from "react"

class Row extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h3>Username: {this.props.username} | Easy: {this.props.easySolved} | Medium: {this.props.mediumSolved} | Hard: {this.props.hardSolved} | Total: {this.props.totalSolved}</h3>
    )
  }
}

export default Row;