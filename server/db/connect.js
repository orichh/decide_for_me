// mongodb mongoose connection

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/decisions')
  .then((s) => {
    console.log('connected to db!');
  })
  .catch((err) => {
    console.log(err);
  });

const decisionSchema = new mongoose.Schema({
  userName: String,
  decisionToMake: String,
  voteEnded: Boolean,
  choices: Object,
  voteStartTime: Date,
  voteEndTime: Date,
  timer: Number,
});

const Decision = mongoose.model('Decisions', decisionSchema);

module.exports = Decision;
