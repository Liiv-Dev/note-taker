const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public')); // Serve static files from the 'public' directory

// Catch-all route to serve the main HTML file and creates path back to client
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// API endpoint to get all notes and creates path back to client
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));