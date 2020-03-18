import './OrdersContainer.scss'
import React, {Component} from "react";
import Good from "../Good/Good";
import {observer} from "mobx-react";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Order from "../Order/Order";

export enum GoodsContainerPosition {
    basket = 'BASKET',
    sellerPage = 'SELLER_PAGE',
    likedGoods = 'LIKED_GOODS',
    ordersBuyer = "ORDERS_BUYER",
    ordersSeller = "ORDERS_SELLER",
}

@observer
class OrdersContainer extends Component <{ goods: GoodInterface[], position?: GoodsContainerPosition}> {
    render () {
        return (
                <div className="ordersContainer">
                    <div className="ordersContainer__title">
                        ORDERS
                    </div>

                    <div className="ordersContainer__grid">
                        {
                            this.props.goods.map ( good =>
                                <Order
                                    key={good._id + good.idOrder}
                                    good={good}
                                    idSeller={good.idSeller}
                                    position={this.props.position}
                                />
                            )
                        }
                    </div>
                </div>
        )
    }
}

export {OrdersContainer};