import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from 'react-intl';

import "../src/locale/en"

ReactDOM.render (
    <IntlProvider locale="en">
        <App />
    </IntlProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
