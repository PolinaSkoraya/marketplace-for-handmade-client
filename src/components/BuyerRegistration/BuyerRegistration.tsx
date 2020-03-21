import './BuyerRegistration.scss'
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import RootStore from "../../stores/RootStore";
import {FormattedMessage} from "react-intl";
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';

@observer
class BuyerRegistration extends Component {
    render () {
         const {user} = RootStore;

         return (
             <div className="buyerRegistration">
                <form className="form-log buyerRegistration-form">
                    <h4>
                        <FormattedMessage id="register"/>
                    </h4>
                    <input
                        className="input buyerRegistration-input"
                        type="text"
                        name="nameForRegistration"
                        value={user.nameForRegistration}
                        onChange={user.handleInputChange}
                        placeholder='name'
                    />

                    <input
                        className="input buyerRegistration-input"
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={user.handleInputChange}
                        placeholder='email'
                    />

                    <input
                        className="input buyerRegistration-input"
                        type="text"
                        name="password"
                        value={user.password}
                        onChange={user.handleInputChange}
                        placeholder='password'
                    />

                    <input
                        type="button"
                        className="button-basic"
                        value="Join"
                        onClick={() => user.register(user.nameForRegistration, user.email, user.password)}
                    />

                    <NavLink to={ROUTES.users.login}>
                        <FormattedMessage id="signIn"/>
                    </NavLink>
                </form>
             </div>
         );
    }
}

export default BuyerRegistration;
