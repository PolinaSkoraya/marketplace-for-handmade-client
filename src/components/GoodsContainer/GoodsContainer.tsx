import "./GoodsContainer.scss"
import React, {Component} from "react";
import Good from "../Good/Good";
import {observer} from "mobx-react";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {CSSTransition, TransitionGroup} from "react-transition-group";

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
            <TransitionGroup>
                {/*<CSSTransition*/}
                {/*    in={true}*/}
                {/*    appear={true}*/}
                {/*    timeout={1500}*/}
                {/*    classNames="fade"*/}
                {/*>*/}
                    <div className="goodsContainer">
                        <div className="goodsContainer__title">
                            {this.props.goodsContainerTitle}
                        </div>

                        <div className="goodsContainer__grid">
                            {
                                this.props.goods.map ( good =>
                                    <CSSTransition
                                        in={true}
                                        appear={true}
                                        key={good._id + "anim"}
                                        timeout={1500}
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
                        </div>
                    </div>
                {/*</CSSTransition>*/}
            </TransitionGroup>
        )
    }
}

export {GoodsContainer};
