import React, { Component } from 'react';
import '/client/styles.css'
import Row from './Row';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    this.sortRows = this.sortRows.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  getStats() {
    // get the inputted username
    const username = document.getElementById('username-field').value;
    // fetch the stats for that user
    fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        // create a copy of the current state
        const newState = this.state;
        // push the users data into the users array in the state
        newState.users.push({
          username: username,
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved,
          totalSolved: data.totalSolved
        });

        // set the state to be the new state
        this.setState({ state: newState });
        // console.log(this.state);
      });
    // clear input field
    document.getElementById('username-field').value = '';
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

  componentDidMount() {
    // this.getStats('finleydecker');
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
        <h1 >Leeterboard</h1>
        <div id='input-container'>
          <input type="text" id="username-field" name="username" placeholder='Enter LeetCode username here...' />
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
      </div>
    )
  }
}

export default App;