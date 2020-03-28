import style from './style.module.scss';
import React, {Component} from "react";
import {observer} from "mobx-react";
import {GoodInterface} from "../../stores/helpers/interfaces";
import Order from "../Order/Order";

export enum GoodsContainerPosition {
    basket = 'BASKET',
    sellerPage = 'SELLER_PAGE',
    likedGoods = 'LIKED_GOODS',
    ordersBuyer = "ORDERS_BUYER",
    ordersSeller = "ORDERS_SELLER",
}

interface Props {
    goods: GoodInterface[],
    position?: GoodsContainerPosition
}

@observer
class OrdersContainer extends Component <Props> {
    render () {
        const {goods, position} = this.props;

        return (
            <div className={style.ordersContainer}>
                <div className={style.ordersContainer__title}>
                    ORDERS
                </div>

                <div className={style.ordersContainer__grid}>
                    {
                        goods.map ( good =>
                            <Order
                                key={good._id + good.idOrder}
                                good={good}
                                idSeller={good.idSeller}
                                position={position}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

export {OrdersContainer};