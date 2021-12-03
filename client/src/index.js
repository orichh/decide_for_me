import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';

require('file-loader?name=[name].[ext]!../index.html');

ReactDOM.render(<App />, document.getElementById('app'));
