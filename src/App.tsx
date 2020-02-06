import React, {Component} from 'react';
import './App.scss';

import {BrowserRouter as Router} from 'react-router-dom'
import Navigation from "./components/Navigation/Navigation";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Navigation/>
                </Router>
            </div>
        );
    }
}

export default App;
