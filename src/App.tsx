import React, {Component} from 'react';
import './App.scss';

import {BrowserRouter as Router} from 'react-router-dom'

import BuyerRegistration from './components/buyerRegistration/buyerRegistration'
import BuyerLogin from './components/buyerLogin/buyerLogin';
import Navigation from "./components/navigation/navigation";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Navigation/>
                    <div>
                        <BuyerRegistration />
                        <BuyerLogin />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
