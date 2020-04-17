import './BuyerRegistration.scss'
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import RootStore from "../../stores/RootStore";
import {FormattedMessage} from "react-intl";
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';
import { Form, Text } from 'informed';
import Button from "../Button/Button";
import {validateLength} from "../../stores/helpers/validation";
import { withRouter } from "react-router";

@observer
class BuyerRegistration extends Component {
    render () {
         const {user} = RootStore;

         return (
             <div className="buyerRegistration">
                <Form className="form-log buyerRegistration-form">
                    {({ formState }) => (
                        <>
                            <h4>
                                <FormattedMessage id="register"/>
                            </h4>
                            <Text
                                className="input buyerRegistration-input"
                                value={user.nameForRegistration}
                                onChange={user.handleInputChange}
                                placeholder='name'
                                id="nameForRegistration"
                                field="nameForRegistration"
                                validate={validateLength}
                                validateOnChange
                                autoFocus
                            />
                            <label htmlFor="nameForRegistration" className="messageError">{formState.errors.nameForRegistration}</label>

                            <Text
                                className="input buyerRegistration-input"
                                value={user.email}
                                onChange={user.handleInputChange}
                                placeholder='email'
                                id="email"
                                field="email"
                                validate={validateLength}
                                validateOnChange
                            />
                            <label htmlFor="email" className="messageError">{formState.errors.email}</label>

                            <Text
                                className="input buyerRegistration-input"
                                type="password"
                                value={user.password}
                                onChange={user.handleInputChange}
                                placeholder='password'
                                id="password"
                                field="password"
                                validate={validateLength}
                                validateOnChange
                            />
                            <label htmlFor="password" className="messageError">{formState.errors.password}</label>

                            <Button
                                type="submit"
                                onClick={async () => {
                                    await user.register(user.nameForRegistration, user.email, user.password);
                                    // let props: any = this.props;
                                    // props.history.push("/");
                                }}
                                disabled={formState.invalid}
                                className="buttonSign"
                            >
                                <FormattedMessage id="register"/>
                            </Button>

                            <NavLink to={ROUTES.users.login} className="linkToLog">
                                <FormattedMessage id="signIn"/>
                            </NavLink>
                        </>
                    )}
                </Form>
             </div>
         );
    }
}

export default withRouter(BuyerRegistration);
