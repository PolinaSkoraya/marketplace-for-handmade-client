import './Navigation.scss'
import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import {ROUTES} from "../../routes/routes";

import logo from "../../static/icons/diy.svg"


class Navigation extends Component {
    render () {
        return (
            <div className='navigation'>
                <div className='navigation-list'>
                    <NavLink to={ROUTES.root} className="navigation-list__link">
                        <img src={logo} alt="logo" className="navigation-list__image"/>
                    </NavLink>

                    <NavLink to={ROUTES.goods.goods} className="navigation-list__link">Goods</NavLink>

                    <NavLink to={ROUTES.sellers.sellers} className="navigation-list__link">Sellers</NavLink>

                    <NavLink to={ROUTES.buyer.login} className="navigation-list__link">Log in</NavLink>

                    <NavLink to={ROUTES.buyer.registration} className="navigation-list__link">Registration</NavLink>
                </div>
            </div>
        );
    }
}

export default Navigation
