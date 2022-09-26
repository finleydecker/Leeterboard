import React, { Component } from 'react';
import '/client/styles.css'
import Row from './Row';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [] // holds all data from db
    }
    this.sortByTotal = this.sortByTotal.bind(this);
    this.getStats = this.getStats.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.refreshUsers = this.refreshUsers.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUserStats = this.updateUserStats.bind(this);
  }

  // when the page is loaded, fetch all users from the database and setState
  componentDidMount() {
    this.refreshUsers();
  }

  // update the user stats every day
  updateUserStats() {
    // iterate through the users array in the state
    for (let i = 0; i < this.state.users.length; i++) {
      // pull each username
      let username = this.state.users[i].username;
      // fetch each users data
      fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
        .then(res => res.json())
        .then(data => {
          // add username key/value pair to data object
          data.username = username;
          // make a patch request for each user
          fetch('http://localhost:3000/', {
            headers: {
              "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(data)
          })
        })
        // call refresh users function to update the app
        .then(this.refreshUsers);
    }
  }

  // when getStats is called, run refreshUsers to show the newState
  refreshUsers() {
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(users => {
        // declare new state variable
        const newState = this.state;
        // add the current users in the database to the new state
        newState.users = users;
        // set the state to be the new state
        this.setState({ state: newState });
      })
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
        // clear input field
        document.getElementById('username-field').value = '';
        // send the data object to the server to save it to the database
        fetch('http://localhost:3000/', {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
        })
          // after the user is saved to the database, refresh the users on the page
          .then(this.refreshUsers);
      });
  }

  // leaderboard sorting algo
  sortByTotal(a, b) {
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

  handleRowClick(event) {
    // get the row with the rowOnClick class
    const el = document.getElementsByClassName('rowOnClick');
    // remove the rowOnClick class
    if (el.length === 1) el[0].classList.remove('rowOnClick')
    // add the class to the element you clicked
    event.target.parentNode.classList.add('rowOnClick');
  }

  deleteUser() {
    // get the users name from the element with the rowOnClick class
    const userToDelete = document.getElementsByClassName('rowOnClick')[0].firstChild.nextSibling.textContent;
    // send delete request to my server
    fetch('http://localhost:3000/', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE",
      body: JSON.stringify({ username: userToDelete })
    })
      // after the user is deleted from the database, refresh the users on the page
      .then(this.refreshUsers);
  }

  render() {

    const rows = [];
    // sort the rows by total solved desc
    const userArr = this.state.users.sort(this.sortByTotal);
    for (let i = 0; i < userArr.length; i++) {
      rows.push(<Row key={i} click={event => this.handleRowClick(event)} rank={i + 1} username={userArr[i].username} easySolved={userArr[i].easySolved} mediumSolved={userArr[i].mediumSolved} hardSolved={userArr[i].hardSolved} totalSolved={userArr[i].totalSolved} />)
    }

    // every 24 hours, update user stats
    setInterval(this.updateUserStats, 86400000);

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
              <th >Hard</th>
              <th>Total</th>
            </tr>
            {rows}
          </table>
        </div>
        <div id='footer'>
          <button id='more-problems'><a target="_blank" href='https://leetcode.com/problemset/all/'>Do more problems!</a></button>
          <button id='delete-button' onClick={this.deleteUser}>Delete User</button>
        </div>
      </div>
    )
  }
}

export default App;