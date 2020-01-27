import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios'
import {observer} from "mobx-react";
import {observable} from "mobx"

@observer
class App extends Component {

    @observable info: any = 'smth';

    componentDidMount(): void {
        axios.get('http://localhost:9000/testAPI')
            .then( (response) => {
                this.info = response.data;
                console.log(this.info);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                <p>{this.info}</p>
            </div>
        );
    }
}

export default App;
