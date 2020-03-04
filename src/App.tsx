import React, {Component} from 'react';
import './App.scss';
import './styles/reset.scss'

import {BrowserRouter, Redirect} from 'react-router-dom'
import Navigation from "./components/Navigation/Navigation";
import {ROUTES} from "./routes/routes";
import HomePage from "./pages/HomePage/HomePage";
import {GoodsPage} from "./pages/GoodsPage/GoodsPage";
import BuyerLogin from "./components/BuyerLogin/BuyerLogin";
import BuyerRegistration from "./components/BuyerRegistration/BuyerRegistration";
import SellerPage from "./pages/SellerPage/SellerPage";
import {Switch, Route} from 'react-router-dom';
import OneGoodPage from "./pages/OneGoodPage/OneGoodPage";
import {observer} from "mobx-react";
import RootStore from "./stores/RootStore";
import BuyerPage from "./pages/BuyerPage/BuyerPage";
import SellerProfile from "./pages/SellerProfile/SellerProfile";
import {RawIntlProvider} from 'react-intl'


@observer
class App extends Component {
    // async componentDidMount() {
    //     await RootStore.init();
    // }

    render() {
        const {user, localization} = RootStore;

        return (
            <RawIntlProvider value={localization.intl}>
                <div className="App">
                    <BrowserRouter>
                        <Navigation/>

                        <Switch>
                            <Route exact path={ROUTES.root} component={HomePage}/>
                            <Route exact path={ROUTES.goods.goods} component={GoodsPage}/>
                            <Route exact path={ROUTES.sellers.sellers} component={SellerProfile}/>
                            <Route path={ROUTES.buyers.login} component={BuyerLogin}/>
                            <Route path={ROUTES.buyers.registration} component={BuyerRegistration}/>
                            <Route exact path={ROUTES.sellers.id} component={SellerPage}/>

                            <Route exact path={ROUTES.goods.id} component={OneGoodPage}/>

                            <Route exact path={ROUTES.sellers.profile} component={SellerProfile}/>
                            <Route exact path={ROUTES.buyers.profile} component={BuyerPage}/>

                        </Switch>

                        {/*<Redirect to={ROUTES.buyers.login}/>*/}
                    </BrowserRouter>
                </div>
            </RawIntlProvider>
        );
    }
}

export default App;
