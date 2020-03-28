import React, {Component} from 'react';
import './BuyerLogin.scss';
import {observer} from "mobx-react";
import RootStore from "../../stores/RootStore";
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from "react-intl";
import MessageError from "../MessageError/MessageError";
import Button from "../Button/Button";

import {FaRegLemon, FaTrash, FaRegSquare, FaPen} from "react-icons/fa";

@observer
class BuyerLogin extends Component {
    render () {
        const {user} = RootStore;

        return (
            <>
                <div className="buyerLogin">
                    <MessageError message="hello" show={user.showMessageError}/>
                    <form className="form-log buyerLogin-form">
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

                        <Button onClick={() => user.login(user.email, user.password)}>sign in</Button>

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
            </>

    );
    }
}

export default BuyerLogin;
