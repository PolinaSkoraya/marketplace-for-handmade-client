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
import {validateLength} from "../../stores/helpers/validation";
import {action} from "mobx";
import { withRouter } from "react-router";

@observer
class BuyerLogin extends Component {
    @action
    async login(user, email, password) {
        const response = await user.login(email, password);
        let props: any = this.props;
        if (response) {
            props.history.push("/");
        }
    }

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
                                <p className="buyerLoginForm__title">
                                    <FormattedMessage id="signIn"/>
                                </p>

                                <Text
                                    field="email"
                                    className = 'input buyerLogin-input'
                                    onChange={user.handleInputChange}
                                    placeholder='email'
                                    value={user.email}
                                    id="email"
                                    validate={validateLength}
                                    validateOnChange
                                    autoFocus
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

                                <Button
                                    type="submit"
                                    className="buttonSign"
                                    onClick={() => this.login(user, formState.values.email, formState.values.password)}
                                    disabled={formState.invalid}
                                >
                                    <FormattedMessage id="signIn"/>
                                </Button>

                                <NavLink to={ROUTES.users.registration} className="linkToRegistr">
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

export default withRouter(BuyerLogin);
