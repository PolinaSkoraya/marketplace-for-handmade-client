import React, {Component} from 'react';
import './BuyerLogin.scss';
import {observer} from "mobx-react";
import {instance} from "../../http/instance";
import {URLS} from "../../http/urls";
import {UserStore} from "../../stores/UserStore";
import RootStore from "../../stores/RootStore";
import {ROUTES} from "../../routes/routes";
import {NavLink, Redirect} from 'react-router-dom';
import {FormattedMessage} from "react-intl";

const {user} = RootStore;

@observer
class BuyerLogin extends Component {
    componentDidMount() {
        instance
            .get(URLS.buyers)
            .then(response => {
                if (response.data.length > 0) {
                    user.email = response.data[0].email;
                }
            })
            .catch((error) => {
                console.log(error.body);
            })
    }

    render () {

        return (
            <div className="buyerLogin">
                <h4>
                    <FormattedMessage id="signIn"/>
                </h4>

                <form className="buyerLogin-form">
                   <input
                       className = 'buyerLogin-input'
                       type='text'
                       name="email"
                       onChange={user.handleInputChange}
                       placeholder='email'
                       value={user.email}
                   />

                   <input
                       className = 'buyerLogin-input'
                       type='text'
                       name="password"
                       onChange={user.handleInputChange}
                       placeholder='password'
                       value={user.password}
                    />

                    <input type="button" value="Sing in" onClick={user.loginBuyer}/>
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
