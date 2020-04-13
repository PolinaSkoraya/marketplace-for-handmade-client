import React, {lazy} from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRouter from "./routes/PrivateRouter";
import {ROUTES} from "./routes/routes";
import BuyerLogin from "./components/BuyerLogin/BuyerLogin";
import BuyerRegistration from "./components/BuyerRegistration/BuyerRegistration";
import {Roles} from "./stores/helpers/roles";
import Modals from "./components/Modals";

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const GoodsPage = lazy(() => import("./pages/GoodsPage/GoodsPage"));
const SellerProfile = lazy(() => import("./pages/SellerProfile/SellerProfile"));
const SellerPage = lazy(() => import("./pages/SellerPage/SellerPage"));
const OneGoodPage = lazy(() => import("./pages/OneGoodPage/OneGoodPage"));
const BuyerPage = lazy(() => import("./pages/BuyerPage/BuyerPage"));

const routes = [
    { path: ROUTES.admin, Component: Admin },
    { path: ROUTES.root, Component: HomePage },
    { path: ROUTES.goods.goods, Component: GoodsPage },
    { path: ROUTES.users.login, Component: BuyerLogin },
    { path: ROUTES.users.registration, Component: BuyerRegistration }
];

const privateRoutes = [
    { path: ROUTES.sellers.sellers, roles: [Roles.buyer], Component: SellerProfile },
    { path: ROUTES.sellers.id, roles: [Roles.buyer], Component: SellerPage },
    { path: ROUTES.goods.id, roles: [Roles.buyer], Component: OneGoodPage },
    { path: ROUTES.users.profile, roles: [Roles.buyer], Component: BuyerPage },
];

function Container({ location }) {
    return (
        <div>
            <TransitionGroup className="transition-group">
                <CSSTransition
                    key={location.key}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames={'page'}
                >
                    <section className="route-section">
                        <Switch location={location}>
                            {
                                routes.map(({ path, Component }) => (
                                    <Route key={path} exact path={path}>
                                            <Component />
                                    </Route>
                                ))

                            }
                            {
                                privateRoutes.map(({ path, roles, Component }) => (
                                    <PrivateRouter key={path} exact path={path} component={Component} roles={roles}/>
                                ))
                            }
                            <Route path="*">
                                <NoMatch location={location}/>
                            </Route>
                        </Switch>
                    </section>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

function NoMatch ({location}) {
    return (
        <div style={{height: "550px", backgroundColor: "white", paddingTop: "100px"}}>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

export default withRouter(Container);