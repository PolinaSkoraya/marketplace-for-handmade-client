import React, {Component} from 'react';
import './BuyerLogin.scss';
import {observer} from "mobx-react";
import RootStore from "../../stores/RootStore";
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from "react-intl";
import MessageError from "../MessageError/MessageError";
import Button from "../Button/Button";
import { Form, Text } from 'informed';
import {FaRegLemon, FaTrash, FaRegSquare, FaPen} from "react-icons/fa";
import * as Yup from 'yup';

export const validateLength = value => {
    return !value || value.length < 6
        ? "must be longer than 5 characters"
        : undefined;
};

export const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .required('Required')
});

@observer
class BuyerLogin extends Component {

    render () {
        const {user} = RootStore;

        return (
            <>
                <div className="buyerLogin">
                    <div className="message">
                        <MessageError message="hello" show={user.showMessageError}/>
                    </div>

                    <Form className="form-log buyerLogin-form">
                        {({ formState }) => (
                            <>
                                <h4 className="buyerLogin-form__name">
                                    <FormattedMessage id="signIn"/>
                                </h4>

                                <Text
                                    field="email"
                                    className = 'input buyerLogin-input'
                                    onChange={user.handleInputChange}
                                    placeholder='email'
                                    value={user.email}
                                    id="email"
                                    validate={validateLength}
                                    validateOnChange
                                />
                                <label htmlFor="email" className="messageError">{formState.errors.email}</label>

                                <Text
                                    type="password"
                                    field="password"
                                    className = 'input buyerLogin-input'
                                    onChange={user.handleInputChange}
                                    placeholder='password'
                                    value={user.password}
                                    id="password"
                                    validate={validateLength}
                                    validateOnChange
                                />
                                <label htmlFor="password" className="messageError">{formState.errors.password}</label>

                                <Button type="submit" onClick={() => user.login(user.email, user.password)} disabled={formState.invalid}>
                                    <FormattedMessage id="signIn"/>
                                </Button>

                                <NavLink to={ROUTES.users.registration}>
                                    <FormattedMessage id="register"/>
                                </NavLink>
                            </>
                        )}

                    </Form>

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
