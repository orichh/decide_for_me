const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3002;

const app = express();

// controller functions
const { getAllDecisions, getLatestDecision } = require('./db/controllers.js');

// middleware

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(require('body-parser').urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      `GET http://localhost:3002/decisions <br/><br/> POST http://localhost:3002/decision <br/><br/> PUT http://localhost:3002/vote`
    );
});

app.get('/decisions', (req, res) => {
  getAllDecisions()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res
        .status(500)
        .send('something went wrong with getting all the decisions');
    });
});

app.get('/decision', (req, res) => {
  decisions
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send('something went wrong getting the decisions', err);
    });
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
