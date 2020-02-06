import './Navigation.scss'
import React, {Component} from "react";
import {Switch, Route, NavLink} from 'react-router-dom'
import {ROUTES} from "../../routes/routes";
import BuyerLogin from '../BuyerLogin/BuyerLogin';
import Goods from '../Goods/Goods';
import Sellers from '../Sellers/Sellers';
import BuyerRegistration from '../BuyerRegistration/BuyerRegistration';

class Navigation extends Component {
    render () {
        return(
            <div className='navigation'>
                <ul className='navigation-list'>
                    <li className='navigation-list__item'>
                        <NavLink to={ROUTES.root}>Home</NavLink>
                    </li>

                    <li className='navigation-list__item'>
                        <NavLink to={ROUTES.goods}>Goods</NavLink>
                    </li>

                    <li className='navigation-list__item'>
                        <NavLink to={ROUTES.sellers}>Sellers</NavLink>
                    </li>

                    <li className='navigation-list__item'>
                        <NavLink to={ROUTES.buyer.login}>Log in</NavLink>
                    </li>

                    <li className='navigation-list__item'>
                        <NavLink to={ROUTES.buyer.registration}>Registration</NavLink>
                    </li>
                </ul>

                <Switch>
                    <Route path={ROUTES.goods} component={Goods}/>
                    <Route path={ROUTES.sellers} component={Sellers}/>
                    <Route path={ROUTES.buyer.login} component={BuyerLogin}/>
                    <Route path={ROUTES.buyer.registration} component={BuyerRegistration}/>
                </Switch>
            </div>
        );
    }
}

export default Navigation
