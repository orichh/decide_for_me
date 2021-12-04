import React from 'react';
import Countdown from '@components/Countdown';
import { StartVote, SubmitVote } from '@components/Buttons';
import TextField from '@mui/material/TextField';

const Choices = ({ state, setState }) => {
  const addChoice = (event) => {
    event.preventDefault();
    const index = event.target.id;
    let newArr = [...state.choices];
    newArr[index] = event.target.value;
    setState({ ...state, choices: newArr });
    console.log(event.target.id);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>{state.userName} needs help making a decision</h2>
        <h2>{state.decisionToMake}</h2>
        <Countdown state={state} setState={setState} />
        {state.voteStarted === true ? (
          <SubmitVote state={state} setState={setState} />
        ) : (
          <StartVote state={state} setState={setState} />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
        }}
      >
        <h1>Choices</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '90%',
            justifyContent: 'space-between',
          }}
        >
          {state.voteStarted === false
            ? state.choices.map((element, index, collection) => {
                return (
                  <TextField
                    required={index <= 1 ? true : false}
                    disabled={
                      index === 0 || state.choices[index - 1] !== ''
                        ? false
                        : true
                    }
                    sx={{
                      display: 'flex',
                      padding: '0%',
                      margin: '.5%',
                      cursor: 'pointer',
                      visibility:
                        index === 0 || state.choices[index - 1] !== ''
                          ? 'visible'
                          : 'hidden',
                    }}
                    id={`${index}`}
                    label={`Choice #${index + 1}`}
                    placeholder="interstellar"
                    variant="standard"
                    onChange={addChoice}
                    key={index}
                  >
                    {element}
                  </TextField>
                );
              })
            : state.choices.map((element, index, collection) => {
                return element !== '' ? (
                  <div
                    style={{
                      display: 'flex',
                      padding: '5%',
                      margin: '5%',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      border: '1px solid black',
                    }}
                  >
                    {element}
                  </div>
                ) : null;
              })}
        </div>
      </div>
    </div>
  );
};

export default Choices;
