const express = require('express');
const app = express();
const port = 5400;


app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})