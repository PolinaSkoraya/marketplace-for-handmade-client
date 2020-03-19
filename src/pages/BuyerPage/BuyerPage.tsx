import './BuyerPage.scss'
import React, {Component} from "react";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import RootStore from "../../stores/RootStore";
import {FormattedMessage} from "react-intl";
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';

import basket from "../../static/icons/svg/shopping-cart.svg";
import {action, observable} from "mobx";
import {ROUTES} from "../../routes/routes";
import {GoodsContainerPosition, OrdersContainer} from "../../components/OrdersContainer/OrdersContainer";

@observer
class BuyerPage extends Component {
    @observable animation = false;
    @observable isRedirect = false;
    @observable appearHome = true;

    @action.bound
    animate () {
        this.animation = true;
        setTimeout(() => {
            this.animation = false;
            this.isRedirect = true;
        }, 2000);
    }

    render () {
        const {user} = RootStore;
        // // @ts-ignore
        // const { history } = this.props;
        // // history.push(ROUTES.goods.goods);
        //
        // const animate = this.animation ? {
        //     top: "0",
        //     left: "0",
        //     animationName: "basket-move",
        //     animationDuration: "2s"
        // } : {};
        //
        // if (this.isRedirect) {
        //     return <Redirect to={ROUTES.goods.goods}/>
        // }

        return (
            <div className="profile-container">
                {/*<div className="profile-container__aside displayNone">*/}
                {/*    <ul className="aside-list">*/}
                {/*        <li className="aside-list__item">*/}
                {/*            /!*<NavLink>Liked</NavLink>*!/*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <div className="profile-container__main">
                    {/*<div className="profile-title">*/}
                    {/*    <FormattedMessage id="hello" values={{name: user.name}}/>*/}
                    {/*</div>*/}
                    <div className="basket-container">
                        {
                            user.goodsInBasket[0]?
                            <>
                                <GoodsContainer
                                    goodsContainerTitle="Basket"
                                    goods={user.goodsInBasket}
                                    goodsContainerPosition={GoodsContainerPosition.basket}
                                />

                                <div className="basket-container__cost">
                                    <FormattedMessage id="basketCost" values={{basketCost: user.basketCost}}/>
                                </div>
                            </>
                            :
                            <div className="basket-container__empty">
                                <div className="basket-container__empty-message">
                                    Your basket is empty! Click to go to the goods catalog
                                </div>

                                <NavLink to={ROUTES.goods.goods} className="">
                                    <img onClick={this.animate} className="img-shopping-cart" src={basket} alt="shopping-cart"/>
                                </NavLink>
                            </div>
                        }
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

                    <OrdersContainer
                        goods={user.orders}
                        position={GoodsContainerPosition.ordersBuyer}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(BuyerPage);