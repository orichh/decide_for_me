import React, { useState, useEffect } from 'react';
import Countdown from '@components/Countdown';
import { StartVote, SubmitVote } from '@components/Buttons';
import TextField from '@mui/material/TextField';

const Choices = ({ state, setState, remainingTime }) => {
  const [selectedChoice, setSelectedChoice] = useState(0);

  // allows user to add choices for their decision
  const addChoice = (event) => {
    event.preventDefault();
    const index = event.target.id;
    let newArr = [...state.choices];
    newArr[index] = { choiceText: event.target.value, numVotes: 0 };
    setState({ ...state, choices: newArr });
    console.log(event.target.id);
  };

  // allows other users to select a choice
  const selectChoice = (event) => {
    event.preventDefault();
    setState({ ...state, voteSelection: event.target.id });
  };
  console.log('state in choices', state);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
        {state.userName !== '' ? (
          <p>{state.userName} needs help making a decision</p>
        ) : (
          <p>add your name</p>
        )}
        {state.decisionToMake !== '' ? <p>{state.decisionToMake}</p> : <p></p>}
        <Countdown remainingTime={remainingTime} state={state} />
        {state.voteEnded === false ? (
          <SubmitVote
            state={state}
            setState={setState}
            selectedChoice={selectedChoice}
          />
        ) : (
          <StartVote state={state} setState={setState} />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '60%',
        }}
      >
        <h1>Choices</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '90%',
            justifyContent: 'space-evenly',
          }}
        >
          {state.voteEnded === true
            ? state.choices.map((element, index, collection) => {
                return (
                  <TextField
                    required={index <= 1 ? true : false}
                    disabled={
                      index === 0 || state.choices[index - 1].choiceText !== ''
                        ? false
                        : true
                    }
                    sx={{
                      display: 'flex',
                      padding: '0%',
                      margin: '.5%',
                      cursor: 'pointer',
                      visibility:
                        index === 0 ||
                        state.choices[index - 1].choiceText !== ''
                          ? 'visible'
                          : 'hidden',
                    }}
                    id={`${index}`}
                    label={`Choice #${index + 1}`}
                    placeholder="interstellar"
                    variant="standard"
                    onChange={addChoice}
                    key={index}
                    inputProps={{ maxLength: 50 }}
                  >
                    {element}
                  </TextField>
                );
              })
            : state.choices.map((element, index, collection) => {
                return element.choiceText !== '' ? (
                  <div
                    style={{
                      display: 'flex',
                      padding: '5%',
                      margin: '5%',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      border: '1px solid black',
                    }}
                    id={index}
                    key={index}
                    onClick={selectChoice}
                  >
                    {element.choiceText}
                  </div>
                ) : null;
              })}
        </div>
      </div>
    </div>
  );
};

export default Choices;
