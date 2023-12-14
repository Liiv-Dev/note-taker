const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Imports uuid


const dbNotes = require('./db/db.json');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public')); // Serve static files from the 'public' directory

// app.get('*', (req, res) => { res.sendFile(path.join(__dirname, './public/index.html')) });


// Catch-all route to serve the main HTML file and creates path back to client
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, './public/index.html')) });

// API endpoint to get all notes and creates path back to client
app.get('/notes', (req, res) => { res.sendFile(path.join(__dirname, './public/notes.html')) });

// reads the db.json file and returns all saved notes
app.get('/api/notes', (req, res) => { res.json(dbNotes) });

// receives a new note to save on the request body, adds it to the db.json file, then return the new note to the client
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // Assigns a unique UUID to the new note

    dbNotes.push(newNote); // Add the new note to the array of notes

    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to write data' });
        }
        res.json(newNote); // Return the new note as a response
    });
});

// receive a query parameter containing the id of a note to delete
app.delete('/api/notes/:id', function (req, res) {
    const requestID = req.params.id;

    const noteIndex = dbNotes.findIndex(note => note.id === requestID);

    if (noteIndex !== -1) {
        dbNotes.splice(noteIndex, 1);

        fs.writeFile('./db/db.json', JSON.stringify(dbNotes), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete note' });
            }
            res.json("Note deleted");
        });
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

// listening Ports
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));