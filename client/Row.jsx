import React, { Component } from "react"

class Row extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const profileLink = `https://leetcode.com/${this.props.username}/`;
    return (
      <tr id="row-container">
        <td>#{this.props.rank}</td>
        <td><a target="_blank" href={profileLink}>{this.props.username}</a></td>
        <td>{this.props.easySolved}</td>
        <td>{this.props.mediumSolved}</td>
        <td>{this.props.hardSolved}</td>
        <td>{this.props.totalSolved}</td>
      </tr>
    )
  }
}

export default Row;