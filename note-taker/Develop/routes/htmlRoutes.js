const path = ('path');

// function defines routes for the Express application.
module.exports = function (app) {

// API endpoint to get all notes and creates path back to client
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

// Catch-all route to serve the main HTML file and creates path back to client
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pubic', 'index.html'))
});

}