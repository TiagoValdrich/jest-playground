const express = require('express');
const app = express();

// Declaring routes for the application

app.get('/', (req, res) => {
    return res.status(200).send("Hello World");
});

app.get('/user', (req, res) => {
    return res.status(200).json({
        name: "Potato Guy",
        age: 20,
        email: "potato@random.com"
    });
});

module.exports = app;