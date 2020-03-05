import './BuyerRegistration.scss'
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import RootStore from "../../stores/RootStore";
import {FormattedMessage} from "react-intl";

@observer
class BuyerRegistration extends Component {
    render () {
         const {user} = RootStore;

         return (
             <div className="buyerRegistration">
                <h4>
                    <FormattedMessage id="register"/>
                </h4>

                <form className="buyerRegistration-form">
                    <input
                        className="buyerRegistration-input"
                        type="text"
                        name="nameForRegistration"
                        value={user.nameForRegistration}
                        onChange={user.handleInputChange}
                        placeholder='name'
                    />

                    <input
                        className="buyerRegistration-input"
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={user.handleInputChange}
                        placeholder='email'
                    />

                    <input
                        className="buyerRegistration-input"
                        type="text"
                        name="password"
                        value={user.password}
                        onChange={user.handleInputChange}
                        placeholder='password'
                    />

                    <input type="button" value="Sing in" onClick={user.register}/>
                </form>
             </div>
         );
    }
}

export default BuyerRegistration;
