import './SellerProfile.scss'
import React, {Component} from 'react';
import {getRole, Roles} from "../../stores/helpers/roles";
import RootStore from "../../stores/RootStore";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import {OrdersContainer} from "../../components/OrdersContainer/OrdersContainer";

@observer
class SellerProfile extends Component {
    render() {
        const {user} = RootStore;

        return (
            <div className="seller-profile-container">
                {
                    getRole(Roles.seller) ?
                        <div className="seller-profile-container__header">
                            <h1>{user.seller.name}</h1>
                            <form className="createGood-form">
                                <input
                                    className = 'input createGood-form__input'
                                    type='text'
                                    name="newGoodName"
                                    onChange={user.handleInputChange}
                                    placeholder='name'
                                />
                                <textarea
                                    className = 'input createGood-form__input'
                                    name="newGoodDescription"
                                    onChange={user.handleInputChange}
                                    placeholder='description'
                                />
                                <input
                                    className = 'input createGood-form__input'
                                    type='text'
                                    name="newGoodPrice"
                                    onChange={user.handleInputChange}
                                    placeholder='price'
                                />
                                <button className="button-basic" onClick={user.createGood}>create new good</button>
                            </form>
                        </div>
                        :
                        <div>
                            <p>shop info</p>
                            <input
                                className = ''
                                type='text'
                                name="newShopName"
                                onChange={user.handleInputChange}
                                placeholder='shop name'
                            />
                            <textarea
                                className = ''
                                name="newShopDescription"
                                onChange={user.handleInputChange}
                                placeholder='shop description'
                            />
                            <button onClick={user.setSellerRole}>start selling</button>
                        </div>
                }
                <div>
                    <OrdersContainer
                        goods={user.ordersOfSeller}
                        position={GoodsContainerPosition.ordersSeller}
                    />
                </div>
            </div>
        )
    }
}

export default SellerProfile;