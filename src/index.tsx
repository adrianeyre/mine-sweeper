import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import MineSweeper from './components/mine-sweeper/mine-sweeper';

import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <MineSweeper level="Easy"/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
