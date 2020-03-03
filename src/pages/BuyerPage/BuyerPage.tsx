import './BuyerPage.scss'
import React, {Component} from "react";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import RootStore from "../../stores/RootStore";

const {user} = RootStore;

@observer
class BuyerPage extends Component {
    render() {
        return (
            <>
                <div className="profile-title">Hello, {user.name}</div>
                <div className="basket-container">
                    <GoodsContainer goodsContainerTitle="Basket" goods={user.goodsInBasket} goodsContainerPosition={GoodsContainerPosition.basket}/>
                    <div className="basket-container__cost">
                        Basket cost: {user.basketCost}$
                    </div>
                </div>

                <GoodsContainer goodsContainerTitle="Liked" goods={user.goodsInLikedGoods}/>
            </>
        )
    }
}

export default BuyerPage;