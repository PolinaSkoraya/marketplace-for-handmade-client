import './Navigation.scss'
import React, {Component} from "react";
import {NavLink, Redirect} from 'react-router-dom';
import {ROUTES} from "../../routes/routes";
import { withRouter } from "react-router";

import logo from "../../static/icons/diy.svg"
import RootStore from "../../stores/RootStore";
import {observer} from "mobx-react";
import {getRole, Roles} from "../../stores/helpers/roles";
import {FormattedMessage} from "react-intl";
import {FaRegSquare, FaSignOutAlt} from "react-icons/fa";
import SmallButton from "../SmallButton/SmallButton";

@observer
class Navigation extends Component {

    logOut (user) {
        // this.props.history.push("/");
        user.logOutUser();
    }

    render () {
        const {user} = RootStore;

        return (
            <div className='navigation'>
                <div className='navigation__list'>
                    <div className="navigation__links navigation__links--app">
                        <NavLink to={ROUTES.root} className="navigation__link navigation__link--app">
                            <img src={logo} alt="logo" className="navigation__image"/>
                        </NavLink>

                        <NavLink to={ROUTES.goods.goods} className="navigation__link navigation__link--app">
                            <FormattedMessage id="goods"/>
                        </NavLink>

                        <NavLink to={ROUTES.admin} className="navigation__link navigation__link--app">
                            Admin
                        </NavLink>
                    </div>

                    { user.authenticated ? (
                        <div className="navigation__links navigation__links--user">
                            {
                                getRole(Roles.seller) ?
                                    <NavLink to={ROUTES.sellers.sellers} className="navigation__link navigation__link--user">
                                        <FormattedMessage id="myShop"/>
                                    </NavLink>
                                    :
                                    <NavLink to={ROUTES.sellers.sellers} className="navigation__link navigation__link--user">
                                        <FormattedMessage id="startSelling"/>
                                    </NavLink>
                            }

                            <NavLink to={ROUTES.users.users + user.id} className="navigation__link navigation__link--user">
                                <FormattedMessage id="profile"/>
                            </NavLink>

                            {/*<NavLink*/}
                            {/*    to={ROUTES.root}*/}
                            {/*    className="navigation__link navigation__link--user"*/}
                            {/*>*/}
                            {/*    link to home*/}
                            {/*</NavLink>*/}
                            <div className="navigation__link navigation__link--user">
                                <button
                                    id="logOutButton"
                                    onClick={() => this.logOut(user)}
                                >
                                    log out
                                </button>
                                <SmallButton htmlFor="logOutButton" icon={<FaSignOutAlt/>} style={{fontSize: "20px"}}/>
                            </div>

                        </div>
                    ) : (
                        <div className="navigation__links navigation__links--user">
                            <NavLink to={ROUTES.users.login} className="navigation__link navigation__link--user">
                                <FormattedMessage id="signIn"/>
                            </NavLink>
                        </div>
                    ) }

                </div>
            </div>
        );
    }
}

export default withRouter(Navigation);
