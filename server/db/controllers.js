// functions using the mongoose connection here
const decision = require('./connect.js');

// const test = new decision({
//   userName: 'richard',
//   decisionToMake: 'movie to watch',
//   voteEnded: true,
//   choices: [
//     {
//       choiceText: 'indiana jones',
//       numVotes: 2,
//     },
//     {
//       choiceText: 'jurassic park',
//       numVotes: 5,
//     },
//   ],
//   voteStartTime: '2021-05-18T16:00:00Z',
//   voteEndTime: '2021-05-18T16:00:00Z',
//   timer: 15,
//   topChoice: {
//     choiceText: 'jurassic park',
//     numVotes: 5,
//   },
// });

// test.save();

module.exports = {
  getAllDecisions: () => {
    return decision.find({});
  },

  getLatestDecision: () => {
    return decision.find({}).sort({ _id: -1 }).limit(1);
  },
  addNewDecision: (decisionState) => {
    const newDecision = new decision(decisionState);
    return newDecision.save();
  },
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
