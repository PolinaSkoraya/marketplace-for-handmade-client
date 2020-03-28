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

@observer
class Navigation extends Component {
    async logOut (user) {
        await user.logOutUser();
    }

    render () {
        const {user} = RootStore;

        return (
            <div className={style.navigation}>
                <div className={style.navigation__list}>
                    <div className={style.navigation__links}>
                        <NavLink to={ROUTES.root} className={style.navigation__link} >
                            <img src={logo} alt="logo" className={style.navigation__image}/>
                        </NavLink>

                        <NavLink to={ROUTES.goods.goods} className={style.navigation__link}>
                            <FormattedMessage id="goods"/>
                        </NavLink>

                        <NavLink to={ROUTES.admin} className={style.navigation__link}>
                            Admin
                        </NavLink>
                    </div>

                    { user.authenticated ? (
                        <div className={style.navigation__links}>
                            <div className={style.navigation__userName}>{user.name}</div>
                            {
                                getRole(Roles.seller) ?
                                    <NavLink to={ROUTES.sellers.sellers} className={style.navigation__link}>
                                        <FormattedMessage id="myShop"/>
                                    </NavLink>
                                    :
                                    <NavLink to={ROUTES.sellers.sellers} className={style.navigation__link}>
                                        <FormattedMessage id="startSelling"/>
                                    </NavLink>
                            }
                            <NavLink to={ROUTES.users.users + user.id} className={style.navigation__link}>
                                <div className={style.basketButtons}>
                                    {user.goodsInBasket.length}
                                    <FiShoppingCart/>
                                </div>
                            </NavLink>

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
                            <NavLink to={ROUTES.users.login} className={style.navigation__link}>
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
