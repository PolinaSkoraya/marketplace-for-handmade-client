import './SellerProfile.scss'
import React, {Component} from 'react';
import {getRole, Roles} from "../../stores/helpers/roles";
import RootStore from "../../stores/RootStore";
import Modal from "../../components/Modal/Modal";

const {user} = RootStore;

class SellerProfile extends Component {
    getElem = () => {
        return (
            <form onSubmit={user.createGood} className="createGood-form">
                <input
                    className = 'createGood-form__input'
                    type='text'
                    name="goodName"
                    onChange={user.handleInputChange}
                    placeholder='name'
                />
                <textarea
                    className = 'createGood-form__input'
                    name="description"
                    onChange={user.handleInputChange}
                    placeholder='description'
                />
                <input
                    className = 'createGood-form__input'
                    type='text'
                    name="price"
                    onChange={user.handleInputChange}
                    placeholder='price'
                />
                <input type="submit" value="create good"/>
            </form>
        )
    }

    render() {
        const {user} = RootStore;

        return (
            <div>
                {
                    getRole(Roles.seller) ?
                        <div>
                            <form onSubmit={user.createGood} className="createGood-form">
                                <input
                                    className = 'createGood-form__input'
                                    type='text'
                                    name="goodName"
                                    onChange={user.handleInputChange}
                                    placeholder='name'
                                />
                                <textarea
                                    className = 'createGood-form__input'
                                    name="description"
                                    onChange={user.handleInputChange}
                                    placeholder='description'
                                />
                                <input
                                    className = 'createGood-form__input'
                                    type='text'
                                    name="price"
                                    onChange={user.handleInputChange}
                                    placeholder='price'
                                />
                                <input type="submit" value="create good"/>
                            </form>
                            <Modal children={this.getElem()}/>
                        </div>
                        :
                        <button onClick={user.setSellerRole}>start selling</button>
                }
                {/*<div className="success">*/}
                {/*    <FormattedMessage id="message.goodAdded"/>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default SellerProfile;