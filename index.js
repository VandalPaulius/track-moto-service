const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Here goes website'));
app.post('/api/user/location', (req, res) => {
    console.log("requestbody", req.body);
    res.status(200).send('OK');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));