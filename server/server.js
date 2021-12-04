const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.static(path.resolve(__dirname, './dist')));

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      `GET http://localhost:3002/decisions <br/><br/> POST http://localhost:3002/decision <br/><br/> PUT http://localhost:3002/vote`
    );
});

app.get('/decisions', (req, res) => {
  res.status(200).send('ok');
});

app.post('/decision', (req, res) => {
  res.status(200).send('ok');
});

app.put('/vote', (req, res) => {
  res.status(200).send('ok');
});

app.listen(PORT, (err) => {
  console.log(err ? err : `Back-end server listening on ${PORT}`);
});
