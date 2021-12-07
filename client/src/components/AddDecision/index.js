import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const timerOptions = [
  { key: '15 sec', value: 15 },
  { key: '30 sec', value: 30 },
  { key: '1 min', value: 60 },
];

const AddDecision = ({ state, setState }) => {
  const setTimer = (event) => {
    setState({ ...state, timer: event.target.value });
  };
  const updateDecisionToMake = (event) => {
    setState({ ...state, decisionToMake: event.target.value });
  };
  const updateUserName = (event) => {
    setState({ ...state, userName: event.target.value });
  };
  return (
    <>
      {state.voteEnded === false ? (
        <div></div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderBottom: '1px solid grey',
            // borderRadius: '4px',
            paddingBottom: '2%',
            width: '80%',
            alignItems: 'center',
          }}
        >
          <h1>Add a Decision</h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '60%',
                alignSelf: 'center',
              }}
            >
              <TextField
                required
                id="standard-basic"
                label="Name"
                placeholder="Richard O"
                variant="standard"
                helperText="enter your name"
                // value="test"
                onChange={updateUserName}
                sx={{ width: '60%', alignSelf: 'center' }}
                inputProps={{ maxLength: 50 }}
              />
              <TextField
                id="outlined-select-timer"
                select
                value={state.timer}
                onChange={setTimer}
                helperText="set timer"
                sx={{ width: '20%' }}
              >
                {timerOptions.map((one, two) => (
                  <MenuItem key={one.value} value={one.value}>
                    {one.key}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <TextField
              required
              fullWidth
              id="standard-required"
              label="Decision to make"
              placeholder="What movie should I watch?"
              variant="standard"
              helperText="what's a decision you need to make?"
              onChange={updateDecisionToMake}
              sx={{ alignSelf: 'center', width: '50%' }}
              inputProps={{ maxLength: 100 }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddDecision;
