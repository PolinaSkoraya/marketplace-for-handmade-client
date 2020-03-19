import './SellerProfile.scss'
import React, {Component} from 'react';
import {getRole, Roles} from "../../stores/helpers/roles";
import RootStore from "../../stores/RootStore";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import {OrdersContainer} from "../../components/OrdersContainer/OrdersContainer";
import {goodsCategories} from "../../stores/helpers/interfaces";
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';


@observer
class SellerProfile extends Component {
    render() {
        const {user} = RootStore;

        return (
            <div className="profile-container">
                {
                    getRole(Roles.seller) ?
                        <div className="profile-container__header">
                            <div className="profile-container__info">
                                <NavLink
                                    to={ROUTES.sellers.sellers + user.seller._id}
                                    className="good__shop-name good__link"
                                >
                                    <h1>{user.seller.name}</h1>
                                </NavLink>
                            </div>

                            <form className="createGood-form">
                                <input
                                    className = 'input createGood-form__input'
                                    type='text'
                                    name="newGoodName"
                                    onChange={user.handleInputChange}
                                    placeholder='name'
                                />
                                <textarea
                                    className = 'input createGood-form__input createGood-form__textarea'
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
                                <select
                                    className = 'input createGood-form__input'
                                    name="newGoodCategory"
                                    onChange={user.handleInputChange}
                                >
                                    <option disabled selected value="choose">Choose category</option>
                                    <option value={goodsCategories.art}>art</option>
                                    <option value={goodsCategories.accessories}>accessories</option>
                                    <option value={goodsCategories.homeware}>homeware</option>
                                    <option value={goodsCategories.toys}>toys</option>
                                </select>
                                <button className="button-basic" onClick={user.createGood}>create new good</button>
                            </form>
                        </div>
                        :
                        <div>
                            <p>shop info</p>
                            <input
                                className = "input"
                                type='text'
                                name="newShopName"
                                onChange={user.handleInputChange}
                                placeholder='shop name'
                            />
                            <textarea
                                className = "input"
                                name="newShopDescription"
                                onChange={user.handleInputChange}
                                placeholder='shop description'
                            />
                            <button onClick={user.setSellerRole}>start selling</button>
                        </div>
                }
                {
                    user.ordersOfSeller[0] &&
                    <OrdersContainer
                        goods={user.ordersOfSeller}
                        position={GoodsContainerPosition.ordersSeller}
                    />
                }
            </div>
        )
    }
}

export default SellerProfile;