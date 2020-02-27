import React, {Component} from 'react';
import './BuyerLogin.scss';
import {observer} from "mobx-react";
import {instance} from "../../http/instance";
import {URLS} from "../../http/urls";
import {UserStore} from "../../stores/UserStore";
import RootStore from "../../stores/RootStore";
import {ROUTES} from "../../routes/routes";
import {NavLink, Redirect} from 'react-router-dom';

@observer
class BuyerLogin extends Component {

    componentDidMount() {
        const {user} = RootStore;

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
        const {user} = RootStore;

        return (
            <div className="buyerLogin">
                <h4>Login</h4>

                <form onSubmit={user.loginBuyer} className="buyerLogin-form">
                   <input
                       className = 'buyerLogin-input'
                       type='text'
                       onChange={user.onChangeEmail}
                       placeholder='email'
                       value={user.email}
                   />

                   <input
                       className = 'buyerLogin-input'
                       type='text'
                       onChange={user.onChangePassword}
                       placeholder='password'
                       value={user.password}
                    />

                    <input type="submit" value="Sing in"/>
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
