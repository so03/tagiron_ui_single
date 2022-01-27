const express = require('express');
const app = express();
const api = express.Router();
api.use(express.json());

api.get('/rooms/1/members', (req, res) => {
    res.json([
        {
            name: "sasaki"
        }
    ])
})

app.get('/api/cards', (req, res) => {
    res.json([
        {
            color: "red",
            number: 1,
        },
        {
            color: "blue",
            number: 1,
        },
        {
            color: "yellow",
            number: 5,
        },
        {
            color: "red",
            number: 8,
        }
    ])
})

app.use('/api', api);

app.listen(3030);