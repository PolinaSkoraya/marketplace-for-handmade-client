import style from './style.module.scss';
import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import {ROUTES} from "../../routes/routes";
import { withRouter } from "react-router";
import logo from "../../static/icons/diy.svg";
import RootStore from "../../stores/RootStore";
import {observer} from "mobx-react";
import {getRole, Roles} from "../../stores/helpers/roles";
import {FormattedMessage} from "react-intl";
import {FaSignOutAlt} from "react-icons/fa";
import {FiShoppingCart} from "react-icons/fi";
import Button from "../Button/Button";
import classNames from "classnames";

@observer
class Navigation extends Component {
    async logOut (user) {
        await user.logOutUser();

        let props: any = this.props;
        props.history.push("/");
    }

    render () {
        const {user} = RootStore;

        let props: any = this.props;

        return (
            <>
                <div className={style.navigation__list}>
                    <div className={style.navigation__links}>
                        <NavLink
                            to={ROUTES.root}
                            className={style.navigation__link}
                        >
                            <img src={logo} alt="logo" className={style.navigation__image}/>
                        </NavLink>

                        <NavLink
                            to={ROUTES.goods.goods}
                            className={classNames(style.navigation__link, {[style.activeLink]: props.history.location.pathname === ROUTES.goods.goods})}
                        >
                            <FormattedMessage id="goods"/>
                        </NavLink>

                        <NavLink to={ROUTES.admin}
                                 className={classNames(style.navigation__link, {[style.activeLink]: props.history.location.pathname === ROUTES.admin})}
                        >
                            Admin
                        </NavLink>
                    </div>

                    { user.authenticated ? (
                        <div className={style.navigation__links}>
                            <div className={style.dropdown}>
                                <div
                                    className = {classNames(style.dropbtn,
                                        {[style.activeLink]: props.history.location.pathname === ROUTES.sellers.sellers + user.seller._id})}
                                >
                                    <FormattedMessage id="myShop"/>
                                </div>
                                <div className={style.dropdownContent}>
                                    {
                                        getRole(Roles.seller) ?
                                            <>
                                                <NavLink
                                                    to={ROUTES.sellers.sellers + user.seller._id}
                                                    className={style.navigation__link}
                                                >
                                                    <FormattedMessage id="shopJ"/>
                                                </NavLink>

                                                <NavLink
                                                    to={ROUTES.sellers.sellers}
                                                    className={style.navigation__link}
                                                >
                                                    <FormattedMessage id="orders"/>
                                                </NavLink>
                                            </>
                                            :
                                            <NavLink to={ROUTES.sellers.sellers} className={style.navigation__link}>
                                                <FormattedMessage id="startSelling"/>
                                            </NavLink>
                                    }
                                </div>
                            </div>

                            <NavLink to={ROUTES.users.users + user.id} className={style.navigation__link}>
                                <div
                                    className={classNames(style.basketButtons, {[style.activeLink]: props.history.location.pathname === ROUTES.users.users + user.id})}
                                >
                                    {user.goodsInBasket.length}
                                    <FiShoppingCart/>
                                </div>
                            </NavLink>

                            <div className={style.navigation__userName}>{user.name}</div>

                            <div className={style.navigation__link}>
                                <Button
                                    styleType="medium"
                                    id="logOutButton"
                                    onClick={() => this.logOut(user)}
                                >
                                    <FaSignOutAlt/>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={style.navigation__link}>
                            <NavLink to={ROUTES.users.login}
                                     className={classNames(style.navigation__link, {[style.activeLink]: props.history.location.pathname === ROUTES.users.login})}
                            >
                                <FormattedMessage id="signIn"/>
                            </NavLink>
                        </div>
                    ) }
                </div>
            </>
        );
    }
}

export default withRouter(Navigation);
