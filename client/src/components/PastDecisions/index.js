import React from 'react';

const PastDecisions = ({ previousDecisions, setPreviousDecisions }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Past Decisions</h1>
      {previousDecisions.reverse().map((element, index, collection) => {
        return (
          <div key={index}>
            User Name: {element.userName}
            <br />
            User Decision: {element.decisionToMake}
            <br />
            Time Selected: {element.timer}
            <br />
            Vote Start Time: {element.voteStartTime}
            <br />
            Vote End Time: {element.voteEndTime}
            <br />
            <div>
              Available Choices:
              {Object.keys(element.choices).map((ele, index, collection) => {
                return (
                  <div key={index}>
                    {element.choices[ele].choiceText}:{' '}
                    {element.choices[ele].numVotes}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PastDecisions;
