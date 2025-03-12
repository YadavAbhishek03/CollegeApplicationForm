const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');  // Required to resolve paths
require('dotenv').config();  // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (index.html, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from the 'public' directory

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL database:', err);
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Serve the root (index.html) for GET requests to /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Ensure index.html exists in the project root directory
});

// POST endpoint for the application form submission
app.post('/api/submit-application', (req, res) => {
    const { name, email, course, birthdate, address } = req.body;

    const query = `INSERT INTO applications (name, email, course, birthdate, address) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [name, email, course, birthdate, address], (err, result) => {
        if (err) {
            console.error('Error submitting application:', err);
            return res.status(500).json({ message: 'Error submitting application' });
        }
        res.status(200).json({ message: 'Application submitted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


