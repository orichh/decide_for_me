const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3002;

const app = express();

// controller functions
const {
  getAllDecisions,
  getLatestDecision,
  addNewDecision,
  updateLatestDecisionVoteEnded,
  incrementVoteForChoice,
} = require('./db/controllers.js');

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

// routes ----------------------

// send back a list of available endpoints
app.get('/', (req, res) => {
  res.status(200).send(
    `GET http://localhost:3002/decisions <br/><br/>
      POST http://localhost:3002/decision <br/><br/>
      PUT http://localhost:3002/vote`
  );
});

// get all decisions
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

// get most recent decision
app.get('/decision', (req, res) => {
  getLatestDecision()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send('something went wrong getting the decisions', err);
    });
});

// add a decision
app.post('/decision', (req, res) => {
  let decisionState = req.body;
  console.log(req.body);

  decisionState.voteStartTime = new Date();
  decisionState.voteEndTime = new Date(
    new Date().setSeconds(new Date().getSeconds() + parseInt(req.body.timer))
  );
  console.log(decisionState.voteEndTime);
  decisionState.voteEnded = false;
  console.log('state with changes 🚁🚁🚁🚁🚁🚁🚁', decisionState);
  // res.sendStatus(200);
  addNewDecision(decisionState)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send('something went wrong adding the decision', err);
    });
});

// update a decision's voteEnded prop to true after counter is complete
app.put('/decision', (req, res) => {
  updateLatestDecisionVoteEnded(req.query._id, req.query.choiceText)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send('something went wrong adding the decision', err);
    });
});

app.put('/vote', (req, res) => {
  console.log(`${req.query._id} ${req.query.voteSelection}`);
  incrementVoteForChoice(req.query._id, req.query.voteSelection)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send('something went wrong adding the decision', err);
    });
});

// increment vote for a choice
app.put('/vote', (req, res) => {
  res.status(200).send('ok');
});

app.listen(PORT, (err) => {
  console.log(err ? err : `Back-end server listening on ${PORT}`);
});
