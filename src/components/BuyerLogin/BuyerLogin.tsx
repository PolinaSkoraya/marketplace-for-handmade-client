import React, {Component} from 'react';
import './BuyerLogin.scss';
import {observer} from "mobx-react";
import {instance} from "../../http/instance";
import {URLS} from "../../http/urls";
import {LoginBuyerStore} from '../../stores/LoginBuyerStore';

@observer
class BuyerLogin extends Component {
    store: LoginBuyerStore = new LoginBuyerStore();

    componentDidMount() {
        instance
            .get(URLS.buyers)
            .then(response => {
                if (response.data.length > 0) {
                    this.store.email = response.data[0].email;
                }
            })
            .catch((error) => {
                console.log(error.body);
            })
    }

    render () {
        return(
            <div className="buyerLogin">
                <h4>Login</h4>

                <form onSubmit={this.store.onSubmit} className="buyerLogin-form">
                   <input
                       className = 'buyerRegistration-form__input'
                       type='text'
                       onChange={this.store.onChangeEmail}
                       placeholder='email'
                       value={this.store.email}
                   />

                   <input
                       className = 'buyerRegistration-form__input'
                       type='text'
                       onChange={this.store.onChangePassword}
                       placeholder='password'
                       value={this.store.password}
                    />

                    <input type="submit" value="Sing in"/>
                 </form>
            </div>
    );
    }
}

export default BuyerLogin;
