import "./GoodsContainer.scss"
import React, {Component} from "react";
import Good from "../Good/Good";
import {observer} from "mobx-react";
import {GoodInterface} from "../../stores/helpers/interfaces";

export enum GoodsContainerPosition {
    basket = 'BASKET',
    sellerPage = 'SELLER_PAGE',
    likedGoods = 'LIKED_GOODS',
    ordersBuyer = "ORDERS_BUYER",
    ordersSeller = "ORDERS_SELLER",
}

@observer
class GoodsContainer extends Component <{ goodsContainerTitle: string, goods: GoodInterface[], goodsContainerPosition?: GoodsContainerPosition }> {
    render () {
        return (
            <div className="goodsContainer">
                <div className="goodsContainer__title">
                    {this.props.goodsContainerTitle}
                </div>

                <div className="goodsContainer__grid">
                    {
                        this.props.goods.map ( good =>
                                <Good
                                    key={good._id + good.status}
                                    good={good}
                                    idSeller={good.idSeller}
                                    goodsContainerPosition={this.props.goodsContainerPosition}
                                />
                        )
                    }
                </div>
            </div>
        )
    }
}

export {GoodsContainer};
