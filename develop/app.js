// installed
// npm i express
// npm nodemon
const express = require('express');
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Serve static files from the 'public' directory
app.use(express.static('public'));



// connects to files in routes directory
require('./routes/htmlRoutes'); // html route
require() // api route

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));