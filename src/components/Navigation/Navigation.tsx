import './Navigation.scss'
import React, {Component} from "react";
import {NavLink, Redirect} from 'react-router-dom';
import {ROUTES} from "../../routes/routes";

import logo from "../../static/icons/diy.svg"
import RootStore from "../../stores/RootStore";
import AuthLinks from "../AuthLinks/AuthLinks";
import {observer} from "mobx-react";

@observer
class Navigation extends Component {
    render () {
        const {user} = RootStore;

        return (
            <div className='navigation'>
                <div className='navigation__list'>
                    <div className="navigation__links navigation__links--app">
                        <NavLink to={ROUTES.root} className="navigation__link navigation__link--app">
                            <img src={logo} alt="logo" className="navigation__image"/>
                        </NavLink>

                        <NavLink to={ROUTES.goods.goods} className="navigation__link navigation__link--app">Goods</NavLink>

                        <NavLink to={ROUTES.sellers.sellers} className="navigation__link navigation__link--app">Sellers</NavLink>
                    </div>

                    { user.authenticated ? (
                        <div className="navigation__links navigation__links--user">
                            <NavLink
                                to={ROUTES.root}
                                className="navigation__link navigation__link--user"
                            >
                                <button onClick={user.logOutBuyer}>log out</button>
                            </NavLink>

                        </div>
                    ) : (
                        <div className="navigation__links navigation__links--user">
                            <NavLink to={ROUTES.buyers.login} className="navigation__link navigation__link--user">Log in</NavLink>

                        </div>
                    ) }



                </div>
            </div>
        );
    }
}

export default Navigation;
