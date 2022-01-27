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

api.get('/cards', (req, res) => {
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

api.get('/questions', (req, res) => {
    res.json([
        {
            "text": "1はどこ?",
            "selected": true
        },
        {
            "text": "2はどこ?",
            "selected": false
        },
        {
            "text": "3はどこ?",
            "selected": false
        },
        {
            "text": "4はどこ?",
            "selected": false
        }
    ])
})

app.use('/api', api);

app.listen(3030);