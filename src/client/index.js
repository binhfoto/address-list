/*
npm install --save-dev webpack
npm install --save-dev babel-loader babel-core babel-preset-es2015 babel-preset-react

npm install --save react react-dom

npm install --save express

npm install --save path lodash

npm install --save morgan body-parser method-override


*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
//import OldApp from './old-component/App'

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);