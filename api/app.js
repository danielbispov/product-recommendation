const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 5000;
app.use(cors());

var recommendation;
var data = fs.readFile('./data/data.json', (err, dt) => {
    if(err) throw err;
    data = JSON.parse(dt);
});

function get_recommendation(id) {
    itemId = parseInt(data['data']['reference']['item']['businessId']);
    if(itemId === id) {
        return data['data']['recommendation'];
    }
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/recommendation/:id', (req, res) => {
    const recommendation = get_recommendation(parseInt(req.params.id));
    if(!recommendation) res.status(404).send('This item was not found.');
    res.status(200).send(recommendation);
});

app.listen(port, () => console.log(`Listening on ${port}`));
