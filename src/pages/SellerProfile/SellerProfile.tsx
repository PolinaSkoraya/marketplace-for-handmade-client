import './SellerProfile.scss'
import React, {Component} from 'react';
import {SellerStore} from "../../stores/SellerStore";
import {getRole, Roles} from "../../stores/helpers/roles";
import RootStore from "../../stores/RootStore";

import {FormattedMessage} from "react-intl";
import Modal from "../../components/Modal/Modal";

class SellerProfile extends Component {
    store = new SellerStore();

    getElem = () => {
        return (<form onSubmit={this.store.createGood} className="createGood-form">
            <input
                className = 'createGood-form__input'
                type='text'
                name="name"
                onChange={this.store.handleInputChange}
                placeholder='name'
            />
            <textarea
                className = 'createGood-form__input'
                name="description"
                onChange={this.store.handleInputChange}
                placeholder='description'
            />
            <input
                className = 'createGood-form__input'
                type='text'
                name="price"
                onChange={this.store.handleInputChange}
                placeholder='price'
            />
            <input type="submit" value="create good"/>
        </form>)
    }

    render() {
        const {user} = RootStore;

        return (
            <div>
                {
                    getRole(Roles.seller) ?
                        <div>
                            <form onSubmit={this.store.createGood} className="createGood-form">
                                <input
                                    className = 'createGood-form__input'
                                    type='text'
                                    name="name"
                                    onChange={this.store.handleInputChange}
                                    placeholder='name'
                                />
                                <textarea
                                    className = 'createGood-form__input'
                                    name="description"
                                    onChange={this.store.handleInputChange}
                                    placeholder='description'
                                />
                                <input
                                    className = 'createGood-form__input'
                                    type='text'
                                    name="price"
                                    onChange={this.store.handleInputChange}
                                    placeholder='price'
                                />
                                <input type="submit" value="create good"/>
                            </form>
                            <Modal children={this.getElem()}/>
                        </div>
                        :
                        <button onClick={user.setSellerRole}>start selling</button>
                }
                <div className="success">
                    <FormattedMessage id="message.goodAdded"/>
                </div>
            </div>
        )
    }
}

export default SellerProfile;