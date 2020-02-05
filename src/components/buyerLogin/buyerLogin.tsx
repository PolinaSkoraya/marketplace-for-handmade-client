import React, {Component} from 'react';
import './buyerLogin.scss';
import {observable} from "mobx";
import {observer} from "mobx-react";
import {instance} from "../../http/instance";
import {URLS} from "../../http/urls";

const TOKEN = 'token';

@observer
class BuyerLogin extends Component {
    @observable email = '';
    @observable password = '';

    componentDidMount() {
        instance
            .get(URLS.buyers)
            .then(response => {
                if (response.data.length > 0) {
                        this.email = response.data[0].email;
                }
            })
            .catch((error) => {
                console.log(error.body);
            })
    }

    onChangeEmail = (event) => {
            this.email = event.target.value;
    }

    onChangePassword = (event) => {
            this.password = event.target.value;
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const buyer = {
            email: this.email,
            password: this.password
        }

        try {
            const response = await instance.post(URLS.loginBuyer, buyer);

            localStorage.setItem(TOKEN, response.data);

            console.log( localStorage.getItem(TOKEN));
        } catch (error) {
            console.log(error);
        }
    }

    handleClick = async () => {
        try {
            const response = await instance.get(URLS.goods, {
                headers: {
                    'auth-token': localStorage.getItem(TOKEN),
                },
            })

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    render () {
        return(
            <div className="buyerLogin">
                <button onClick={this.handleClick}>
                    Goods
                </button>

                <h4>Login</h4>

                <form onSubmit={this.onSubmit} className="buyerLogin-form">
                   <input
                       className = 'buyerRegistration-form__input'
                       type='text'
                       onChange={this.onChangeEmail}
                       placeholder='email'
                       value={this.email}
                   />

                   <input
                       className = 'buyerRegistration-form__input'
                       type='text'
                       onChange={this.onChangePassword}
                       placeholder='password'
                       value={this.password}
                    />

                    <input type="submit" value="Sing in"/>
                 </form>
            </div>
    );
    }
}

export default BuyerLogin;
