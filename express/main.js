const express = require('express');
const app = express();

app.get('/api/rooms/1/members', (req, res) => {
    res.send(JSON.stringify([
        {
            name: "sasaki"
        }
    ]))
})

app.listen(3030);