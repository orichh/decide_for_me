import React from 'react';

const PastDecisions = ({ state, setState }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Past Decisions</h1>
      {state.previousDecisions.map((element, index, collection) => {
        return (
          <div>
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
                console.log(element.choices);
                return (
                  <div>
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
