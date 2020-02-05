import React, {Component} from 'react';
import './buyerRegistration.scss';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {instance} from '../../http/instance';
import {URLS} from '../../http/urls';

@observer
class BuyerRegistration extends Component <{}, {name: string, email: string, password: string}> {
    @observable name = '';
    @observable email = '';
    @observable password = '';

    componentDidMount() {

    }

    onChangeName = (event) => {
        this.name = event.target.value;
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
            name: this.name,
            email: this.email,
            password: this.password
        };

        try {
            const response = await instance.post(URLS.registerBuyer, buyer);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    render(){
     return(
         <div className="buyerRegistration">
                <h4>Registration</h4>

                <form onSubmit={this.onSubmit} className="buyerRegistration-form">
                    <input
                        className="buyerRegistration-form__input"
                        type="text"
                        value={this.name}
                        onChange={this.onChangeName}
                        placeholder='name'
                    />

                    <input
                        className="buyerRegistration-form__input"
                        type="text"
                        value={this.email}
                        onChange={this.onChangeEmail}
                        placeholder='email'
                    />

                    <input
                        className="buyerRegistration-form__input"
                        type="text"
                        value={this.password}
                        onChange={this.onChangePassword}
                        placeholder='password'
                    />

                    <input type="submit" value="Sing up"/>
                </form>
         </div>
     );
    }
}

export default BuyerRegistration;
