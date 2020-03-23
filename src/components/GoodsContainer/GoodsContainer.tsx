import "./GoodsContainer.scss"
import React, {Component} from "react";
import Good from "../Good/Good";
import {observer} from "mobx-react";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {observable} from "mobx";

export enum GoodsContainerPosition {
    basket = 'BASKET',
    sellerPage = 'SELLER_PAGE',
    likedGoods = 'LIKED_GOODS',
    ordersBuyer = "ORDERS_BUYER",
    ordersSeller = "ORDERS_SELLER",
}

@observer
class GoodsContainer extends Component <{ goodsContainerTitle: string, goods: GoodInterface[], goodsContainerPosition?: GoodsContainerPosition }> {
    @observable animate = true;

    render () {
        return (
            <div className="goodsContainer">
                <div className="goodsContainer__title">
                    {this.props.goodsContainerTitle}
                </div>

                <div className="goodsContainer__grid">
                    <TransitionGroup component={null}>
                    {
                        this.props.goods.map ( good =>
                                <CSSTransition
                                    in={this.animate}
                                    appear={true}
                                    key={good._id + "anim"}
                                    timeout={200}
                                    classNames="fade"
                                >
                                    <Good
                                        key={good._id + good.idOrder}
                                        good={good}
                                        idSeller={good.idSeller}
                                        goodsContainerPosition={this.props.goodsContainerPosition}
                                    />
                                </CSSTransition>
                        )
                    }
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export {GoodsContainer};
