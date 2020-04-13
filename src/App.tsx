import React, {Component, Suspense, lazy} from 'react';
import './App.scss';

import {BrowserRouter} from 'react-router-dom'
import Navigation from "./components/Navigation/Navigation";
import {observer} from "mobx-react";
import RootStore from "./stores/RootStore";
import {RawIntlProvider} from 'react-intl';
import Spinner from "./components/Spinner/Spinner";
import Container from "./Container";
import Modals from "./components/Modals";


@observer
class App extends Component {
    async componentDidMount () {
        await RootStore.init();
    }

    render() {
        const {localization, isLoading} = RootStore;
        return isLoading ? (
            <Spinner/>
            ) : (
            <RawIntlProvider value={localization.intl}>
                <div className="App">
                    <div className=".modalsWrapper">
                        <Modals/>
                    </div>
                    <BrowserRouter>
                        <Navigation/>
                        <Suspense fallback={<Spinner/>}>
                            <Container/>
                        </Suspense>
                    </BrowserRouter>
                </div>
            </RawIntlProvider>
        );
    }
}

export default App;
