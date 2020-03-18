import React, {Component} from 'react';
import './BuyerLogin.scss';
import {observer} from "mobx-react";
import RootStore from "../../stores/RootStore";
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from "react-intl";

@observer
class BuyerLogin extends Component {
    render () {
        const {user} = RootStore;

        return (
            <div className="buyerLogin">
                <form className="buyerLogin-form">
                    <h4 className="buyerLogin-form__name">
                        <FormattedMessage id="signIn"/>
                    </h4>
                   <input
                       className = 'input buyerLogin-input'
                       type='text'
                       name="email"
                       onChange={user.handleInputChange}
                       placeholder='email'
                       value={user.email}
                   />

                   <input
                       className = 'input buyerLogin-input'
                       type='text'
                       name="password"
                       onChange={user.handleInputChange}
                       placeholder='password'
                       value={user.password}
                    />

                    <input type="button" className="button-basic" onClick={() => user.login(user.email, user.password)} value="sign in"/>
                    {/*<label htmlFor="signInButton" className="signIn-label">sign in</label>*/}
                    <NavLink to={ROUTES.users.registration}>
                        <FormattedMessage id="register"/>
                    </NavLink>
                 </form>

                <NavLink
                    to={ROUTES.root}
                    className="navigation__link navigation__link--user"
                >
                </NavLink>
            </div>
    );
    }
}

export default BuyerLogin;
