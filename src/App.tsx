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
import {RawIntlProvider} from 'react-intl';
import PrivateRouter from "./routes/PrivateRouter";
import {Roles} from "./stores/helpers/roles";
import Admin from "./pages/Admin/Admin";
import { CSSTransition } from 'react-transition-group';

const routes = [
    { path: ROUTES.admin, Component: Admin },
    { path: ROUTES.root, Component: HomePage },
    { path: ROUTES.goods.goods, Component: GoodsPage },
    { path: ROUTES.users.login, Component: BuyerLogin },
    { path: ROUTES.users.registration, Component: BuyerRegistration },
];

const privateRoutes =[
    { path: ROUTES.sellers.sellers, roles: [Roles.buyer], Component: SellerProfile },
    { path: ROUTES.sellers.id, roles: [Roles.buyer], Component: SellerPage },
    { path: ROUTES.goods.id, roles: [Roles.buyer], Component: OneGoodPage },
    { path: ROUTES.users.profile, roles: [Roles.buyer], Component: BuyerPage },
];

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

                        {/*<Switch>*/}
                            {
                                routes.map(({ path, Component }) => (
                                    <Route key={path} exact path={path}>
                                        {({ match }) => (
                                            <CSSTransition
                                                in={match != null}
                                                timeout={300}
                                                classNames="page"
                                                unmountOnExit
                                            >
                                                <div className="page">
                                                    <Component />
                                                </div>
                                            </CSSTransition>
                                        )}
                                    </Route>
                                ))
                            }
                            {
                                privateRoutes.map(({ path, roles, Component }) => (
                                    <PrivateRouter key={path} exact path={path} component={Component} roles={roles}/>
                                ))
                            }
                        {/*    <Route exact path={ROUTES.admin} component={Admin}/>*/}
                        {/*    <Route exact path={ROUTES.root} component={HomePage}/>*/}
                        {/*    <Route exact path={ROUTES.goods.goods} component={GoodsPage}/>*/}
                        {/*    <Route path={ROUTES.users.login} component={BuyerLogin}/>*/}
                        {/*    <Route path={ROUTES.users.registration} component={BuyerRegistration}/>*/}

                            {/*<PrivateRouter*/}
                            {/*    path={ROUTES.sellers.sellers}*/}
                            {/*    roles={[Roles.buyer]}*/}
                            {/*    component={SellerProfile}*/}
                            {/*    exact*/}
                            {/*/>*/}
                            {/*<PrivateRouter*/}
                            {/*    path={ROUTES.sellers.id}*/}
                            {/*    roles={[Roles.buyer]}*/}
                            {/*    component={SellerPage}*/}
                            {/*    exact*/}
                            {/*/>*/}
                            {/*<PrivateRouter*/}
                            {/*    path={ROUTES.goods.id}*/}
                            {/*    roles={[Roles.buyer]}*/}
                            {/*    component={OneGoodPage}*/}
                            {/*    exact*/}
                            {/*/>*/}
                            {/*<PrivateRouter*/}
                            {/*    path={ROUTES.users.profile}*/}
                            {/*    roles={[Roles.buyer]}*/}
                            {/*    component={BuyerPage}*/}
                            {/*    exact*/}
                            {/*/>*/}
                            {/*<PrivateRouter*/}
                            {/*    path={ROUTES.sellers.profile}*/}
                            {/*    roles={[Roles.buyer]}*/}
                            {/*    component={SellerProfile}*/}
                            {/*    exact*/}
                            {/*/>*/}

                        {/*</Switch>*/}

                        {/*<Redirect to={ROUTES.users.login}/>*/}
                    </BrowserRouter>
                </div>
            </RawIntlProvider>
        );
    }
}

export default App;
