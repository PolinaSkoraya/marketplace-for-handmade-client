import React, {Component} from 'react';
import './App.scss';
import './styles/reset.scss'

import {BrowserRouter as Router} from 'react-router-dom'
import Navigation from "./components/Navigation/Navigation";
import {ROUTES} from "./routes/routes";
import HomePage from "./pages/HomePage/HomePage";
import {GoodsPage} from "./pages/GoodsPage/GoodsPage";
import Sellers from "./components/Sellers/Sellers";
import BuyerLogin from "./components/BuyerLogin/BuyerLogin";
import BuyerRegistration from "./components/BuyerRegistration/BuyerRegistration";
import SellerPage from "./pages/SellerPage/SellerPage";
import {Switch, Route} from 'react-router-dom';
import OneGoodPage from "./pages/OneGoodPage/OneGoodPage";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route exact path={ROUTES.root} component={HomePage}/>
                        <Route exact path={ROUTES.goods.goods} component={GoodsPage}/>
                        <Route exact path={ROUTES.sellers.sellers} component={Sellers}/>
                        <Route path={ROUTES.buyer.login} component={BuyerLogin}/>
                        <Route path={ROUTES.buyer.registration} component={BuyerRegistration}/>
                        <Route exact path={ROUTES.sellers.id} component={SellerPage}/>

                        <Route exact path={ROUTES.goods.id} component={OneGoodPage}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
