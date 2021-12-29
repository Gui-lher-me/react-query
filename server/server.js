const express = require('express');
const axios = require('axios');

const app = express();

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS, PUT'
    );
    next();
});

app.get('/users', (req, res) => {
    const users = [];

    axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((data) => {
            data.data.map((user) => users.push(user));
            return res.json({ users });
        })
        .catch((error) => {
            return res.json(
                error.message +
                    ', it means that we could not find the data for the provided url.'
            );
        });
});

app.get('/users/:userId', (req, res) => {
    const { userId: id } = req.params;

    axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((data) => {
            const user = data.data;
            return res.json({ user });
        })
        .catch((error) => {
            return res.json(
                error.message +
                    ', it means that we could not find the data for the provided user id.'
            );
        });
});

const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
