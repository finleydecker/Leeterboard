const express = require('express');
const PORT = 3000;
const path = require('path');
const app = express();

// handle parsing request body
app.use(express.json());

// shows the index.html page but no react stuff
app.use(express.static(path.resolve(__dirname, '../client')));

// app.get('*', (req, res) => {
//   res.sendFile(HTML_FILE);
// });

// app.get('https://leetcode-stats-api.herokuapp.com/finleydecker'), (req, res) => {
//   console.log(res);
// }


// // serve index.html on the route '/'
// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../client'));
// });


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});