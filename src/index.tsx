import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import MineSweeper from './components/mine-sweeper/mine-sweeper';

import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MineSweeper />, document.getElementById('root'));
serviceWorker.unregister();
