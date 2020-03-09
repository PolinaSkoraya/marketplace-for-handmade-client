import './BuyerPage.scss'
import React, {Component} from "react";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import RootStore from "../../stores/RootStore";
import {FormattedMessage} from "react-intl";

@observer
class BuyerPage extends Component {
    toggleMenu() {

    }

    render() {
        const {user} = RootStore;

        return (
            <div className="profile-container">
                <div className="profile-container__aside displayNone">
                    <ul className="aside-list">
                        <li className="aside-list__item">

                        </li>
                    </ul>
                </div>
                <div className="profile-container__main">
                    <div className="profile-title">
                        <button onClick={this.toggleMenu}>menu</button>
                        <FormattedMessage id="hello" values={{name: user.name}}/>
                    </div>
                    <div className="basket-container">
                        {
                            user.goodsInBasket[0]?
                            <GoodsContainer
                                goodsContainerTitle="Basket"
                                goods={user.goodsInBasket}
                                goodsContainerPosition={GoodsContainerPosition.basket}/>
                            :
                            <div>You have no goods in basket</div>
                        }

                        <div className="basket-container__cost">
                            <FormattedMessage id="basketCost" values={{basketCost: user.basketCost}}/>
                        </div>
                    </div>
                    {
                        user.goodsInLikedGoods[0] ?
                        <GoodsContainer
                            goodsContainerTitle="Liked"
                            goods={user.goodsInLikedGoods}
                            goodsContainerPosition={GoodsContainerPosition.likedGoods}
                        />
                        :
                            <div>
                                Like?
                                {/*<NavLink to={ROUTES.goods.goods} className="navigation__link navigation__link--app">*/}
                                {/*    <FormattedMessage id="goods"/>*/}
                                {/*</NavLink>*/}
                            </div>
                    }

                    <GoodsContainer
                        goodsContainerTitle="Orders"
                        goods={user.orders}
                        goodsContainerPosition={GoodsContainerPosition.orders}
                    />
                </div>
            </div>
        )
    }
}

export default BuyerPage;