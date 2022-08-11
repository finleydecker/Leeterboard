import React, { Component } from 'react';
import '/client/styles.css'
import Row from './Row';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [] // holds all data from db
    }
    this.sortRows = this.sortRows.bind(this);
    this.getStats = this.getStats.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getStats() {
    // get the inputted username
    const username = document.getElementById('username-field').value;
    //  fetch the stats for that user
    fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      .then(res => res.json())
      .then(data => {
        // add username key/value pair to data object
        data.username = username;
        console.log('my data is: ', data);
        // clear input field
        document.getElementById('username-field').value = '';
        // send the data object to the server to save it to the database
        return fetch('http://localhost:3000/', {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
        })
      });
  }

  // leaderboard sorting algo
  sortRows(a, b) {
    if (a.totalSolved < b.totalSolved) {
      return 1;
    }
    if (a.totalSolved > b.totalSolved) {
      return -1;
    }
    return 0;
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.getStats();
    }
  }

  render() {
    const rows = [];
    // sort the rows by total solved desc
    const userArr = this.state.users.sort(this.sortRows);
    for (let i = 0; i < userArr.length; i++) {
      rows.push(<Row key={i} rank={i + 1} username={userArr[i].username} easySolved={userArr[i].easySolved} mediumSolved={userArr[i].mediumSolved} hardSolved={userArr[i].hardSolved} totalSolved={userArr[i].totalSolved} />)
    }

    return (
      <div>
        <h1 ><a target="_blank" href="https://leetcode.com/"><img id='logo' src="https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png" alt="" /></a>Leeterboard</h1>
        <div id='input-container'>
          <input type="text" id="username-field" name="username" placeholder='Enter LeetCode username here...' onKeyDown={this.handleKeyDown} />
          <button id='add-user' onClick={this.getStats}>Add User</button>
        </div>
        <div id="leaderboard">
          <table>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Easy</th>
              <th>Medium</th>
              <th>Hard</th>
              <th>Total</th>
            </tr>
            {rows}
          </table>
        </div>
        <div id='footer'>
          <button id='more-problems'><a target="_blank" href='https://leetcode.com/problemset/all/'>Do more problems!</a></button>
        </div>
      </div>
    )
  }
}

export default App;