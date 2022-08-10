import React, { Component } from "react"

class Row extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <h3>Rank: {this.props.rank} | Username: {this.props.username} | Easy: {this.props.easySolved} | Medium: {this.props.mediumSolved} | Hard: {this.props.hardSolved} | Total: {this.props.totalSolved}</h3>
      <div id="row-container">
        <ul id="row">
          <li>{this.props.rank}</li>
          <li>{this.props.username}</li>
          <li>{this.props.easySolved}</li>
          <li>{this.props.mediumSolved}</li>
          <li>{this.props.hardSolved}</li>
          <li>{this.props.totalSolved}</li>
        </ul>
      </div>
    )
  }
}

export default Row;