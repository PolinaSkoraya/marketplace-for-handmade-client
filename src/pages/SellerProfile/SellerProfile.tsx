import './SellerProfile.scss'
import React, {Component} from 'react';
import {getRole, Roles} from "../../stores/helpers/roles";
import RootStore from "../../stores/RootStore";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";

@observer
class SellerProfile extends Component {
    render() {
        const {user} = RootStore;

        return (
            <div className="seller-profile-container">
                {
                    getRole(Roles.seller) ?
                        <div>
                            <h1>{user.seller.name}</h1>
                            <form className="createGood-form">
                                <input
                                    className = 'createGood-form__input'
                                    type='text'
                                    name="newGoodName"
                                    onChange={user.handleInputChange}
                                    placeholder='name'
                                />
                                <textarea
                                    className = 'createGood-form__input'
                                    name="newGoodDescription"
                                    onChange={user.handleInputChange}
                                    placeholder='description'
                                />
                                <input
                                    className = 'createGood-form__input'
                                    type='text'
                                    name="newGoodPrice"
                                    onChange={user.handleInputChange}
                                    placeholder='price'
                                />
                                <button onClick={user.createGood}>create new good</button>
                            </form>
                        </div>
                        :
                        <button onClick={user.setSellerRole}>start selling</button>
                }
                <div>
                    <GoodsContainer
                        goodsContainerTitle="Your orders"
                        goods={user.ordersOfSeller}
                        goodsContainerPosition={GoodsContainerPosition.ordersSeller}
                    />
                </div>
            </div>
        )
    }
}

export default SellerProfile;