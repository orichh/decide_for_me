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
  // receive state from client
  // need to add voteEndTime and voteStartTime to the state object
  // send that new object to the add function
  // add function will send query to mongodb
  console.log(req.query);
  let decisionState = req.query;

  decisionState.voteStartTime = new Date();
  decisionState.voteEndTime = new Date(
    new Date().setSeconds(new Date().getSeconds() + parseInt(req.query.timer))
  );
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
  updateLatestDecisionVoteEnded(req.query._id)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send('something went wrong adding the decision', err);
    });
});

/*
  TODO: DELETE ME
  userName: 'richard',
  decisionToMake: 'test',
  voteEnded: false,
  choices: [
    { choiceText: 'something', numVotes: 2 },
    { choiceText: 'something else', numVotes: 5 }
  ],
  voteStartTime: ISODate("2021-05-18T16:00:00.000Z"),
  voteEndTime: ISODate("2021-05-18T16:00:00.000Z"),
  timer: 15,
*/

// increment vote for a choice
app.put('/vote', (req, res) => {
  res.status(200).send('ok');
});

app.listen(PORT, (err) => {
  console.log(err ? err : `Back-end server listening on ${PORT}`);
});
