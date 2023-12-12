const express = require('express');
const app = express();

app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/notes', (req, res) => {

})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));