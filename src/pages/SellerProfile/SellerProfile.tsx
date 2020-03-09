import './SellerProfile.scss'
import React, {Component} from 'react';
import {getRole, Roles} from "../../stores/helpers/roles";
import RootStore from "../../stores/RootStore";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";

class SellerProfile extends Component {

    render() {
        const {user} = RootStore;

        return (
            <div className="seller-profile-container">
                {
                    getRole(Roles.seller) ?
                        <div>
                            <h1>{user.seller.name}</h1>
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
                        </div>
                        :
                        <button onClick={user.setSellerRole}>start selling</button>
                }
                <div>
                    <GoodsContainer
                        goodsContainerTitle="Your orders"
                        goods={user.ordersOfSeller}
                    />
                </div>
            </div>
        )
    }
}

export default SellerProfile;