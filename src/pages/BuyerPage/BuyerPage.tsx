import './BuyerPage.scss'
import React, {Component} from "react";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import RootStore from "../../stores/RootStore";

const {user} = RootStore;

@observer
class BuyerPage extends Component {

    render() {
        return (
            <div>
                <div className="profile-title">Hello, {user.name}</div>
                <GoodsContainer goodsContainerTitle="Basket" goods={user.goodsInBasket}/>
            </div>
        )
    }
}

export default BuyerPage;