import React, { lazy } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRouter from "./routes/PrivateRouter";
import { ROUTES } from "./routes/routes";
import BuyerLogin from "./pages/Login/Login";
import BuyerRegistration from "./pages/Registration/Registration";
import { Roles } from "./stores/helpers/roles";
import Modals from "./components/Modals";
import NoMatch from "./pages/NoMatch/NoMatch";
import GoodsPage from "./pages/GoodsPage/GoodsPage";
import SellerProfile from "./pages/SellerProfile/SellerProfile";
import SellerPage from "./pages/SellerPage/SellerPage";
import GoodPage from "./pages/GoodPage/GoodPage";
import BuyerPage from "./pages/BuyerPage/BuyerPage";
import HomePage from "./pages/HomePage/HomePage";
import Admin from "./pages/Admin/Admin";

// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
// const Admin = lazy(() => import('./pages/Admin/Admin'));
// const GoodsPage = lazy(() => import("./pages/GoodsPage/GoodsPage"));
// const SellerProfile = lazy(() => import("./pages/SellerProfile/SellerProfile"));
// const SellerPage = lazy(() => import("./pages/SellerPage/SellerPage"));
//const GoodPage = lazy(() => import("./pages/GoodPage/GoodPage"));
// const BuyerPage = lazy(() => import("./pages/BuyerPage/BuyerPage"));

const routes = [
  { path: ROUTES.admin, Component: Admin },
  { path: ROUTES.root, Component: HomePage },
  { path: ROUTES.goods.goods, Component: GoodsPage },
  { path: ROUTES.users.login, Component: BuyerLogin },
  { path: ROUTES.users.registration, Component: BuyerRegistration },
];

const privateRoutes = [
  {
    path: ROUTES.sellers.sellers,
    roles: [Roles.buyer],
    Component: SellerProfile,
  },
  { path: ROUTES.sellers.id, roles: [Roles.buyer], Component: SellerPage },
  { path: ROUTES.goods.id, roles: [Roles.buyer], Component: GoodPage },
  { path: ROUTES.users.profile, roles: [Roles.buyer], Component: BuyerPage },
];

function Container({ location }) {
  return (
    <div>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames={"fadePage"}
        >
          <section className="route-section">
            <Switch location={location}>
              {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                  <Component key={path} />
                </Route>
              ))}
              {privateRoutes.map(({ path, roles, Component }) => (
                <PrivateRouter
                  key={path}
                  exact
                  path={path}
                  component={Component}
                  roles={roles}
                />
              ))}
              <Route path="*">
                <NoMatch location={location} />
              </Route>
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default withRouter(Container);
