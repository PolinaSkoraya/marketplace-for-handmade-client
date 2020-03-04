import './BuyerPage.scss'
import React, {Component} from "react";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import RootStore from "../../stores/RootStore";
import {FormattedMessage} from "react-intl";

@observer
class BuyerPage extends Component {


    render() {
        const {user} = RootStore;

        return (
            <>
                <div className="profile-title">
                    <FormattedMessage id="hello" values={{name: user.name}}/>
                </div>
                <div className="basket-container">
                    <GoodsContainer goodsContainerTitle="Basket" goods={user.goodsInBasket} goodsContainerPosition={GoodsContainerPosition.basket}/>
                    <div className="basket-container__cost">
                        <FormattedMessage id="basketCost" values={{basketCost: user.basketCost}}/>
                    </div>
                </div>

                <GoodsContainer goodsContainerTitle="Liked" goods={user.goodsInLikedGoods}/>
            </>
        )
    }
}

export default BuyerPage;