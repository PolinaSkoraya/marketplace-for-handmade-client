import './BuyerRegistration.scss'
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import RegisterBuyerStore from '../../stores/RegisterBuyerStore';
import RootStore from "../../stores/RootStore";

const {user} = RootStore;

@observer
class BuyerRegistration extends Component{
    store: RegisterBuyerStore = new RegisterBuyerStore();

    render(){
     return(
         <div className="buyerRegistration">
                <h4>Registration</h4>

                <form onSubmit={this.store.onSubmit} className="buyerRegistration-form">
                    <input
                        className="buyerRegistration-input"
                        type="text"
                        value={this.store.name}
                        onChange={this.store.onChangeName}
                        placeholder='name'
                    />

                    <input
                        className="buyerRegistration-input"
                        type="text"
                        value={this.store.email}
                        onChange={this.store.onChangeEmail}
                        placeholder='email'
                    />

                    <input
                        className="buyerRegistration-input"
                        type="text"
                        value={this.store.password}
                        onChange={this.store.onChangePassword}
                        placeholder='password'
                    />

                    <input type="submit" value="Sing up"/>
                </form>
             </div>
     );
    }
}

export default BuyerRegistration;
