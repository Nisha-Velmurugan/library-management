const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('hbs');

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'library',
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the "library" database');
    }
});

const location = path.join(__dirname, './public');
app.use(express.static(location));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/home.html', (req, res) => {
    res.render('home'); 
});


app.post('/submit', (req, res) => {
    const { name, email, password } = req.body;

    console.log('Submitted data:', { name, email, password });

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error storing form data in the database:', err);
            res.status(500).send('Error storing form data in the database');
        } else {
            res.render('home');
        }
    });
    
});

app.listen(3001, () => {
    console.log('Server started @ port 3001');
});
