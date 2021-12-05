// functions using the mongoose connection here
const decision = require('./connect.js');

module.exports = {
  getAllDecisions: () => {
    return decision.find({});
  },

  getLatestDecision: decision
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((results) => {
      console.log(results[0].voteEnded);
    }),
};

// const richardDecisions = decision.find({ userName: /^richard/ });
// console.log(richardDecisions);

/*
  sample insertion

  const test = new decision({
    userName: 'richard',
    decisionToMake: 'test',
    voteEnded: false,
    choices: {
      0: {
        choiceText: 'something',
        numVotes: 2,
      },
      1: {
        choiceText: 'something else',
        numVotes: 5,
      },
    },
    voteStartTime: '2021-05-18T16:00:00Z',
    voteEndTime: '2021-05-18T16:00:00Z',
    timer: 15,
  });

  test.save();
*/

/*
    Sample queries

    const decisions = await Decision.find();
    console.log(decisions);

    const richardDecisions = await Decision.find({ userName: /^richard/ });
    console.log(richardDecisions);
  */
