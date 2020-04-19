import style from "./style.module.scss";
import "./GoodsContainerAnimation.scss"
import React, {Component} from "react";
import Good from "../Good/Good";
import {inject, observer} from "mobx-react";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {observable} from "mobx";
import classNames from "classnames";

export enum GoodsContainerPosition {
    basket = 'BASKET',
    sellerPage = 'SELLER_PAGE',
    likedGoods = 'LIKED_GOODS',
    ordersBuyer = "ORDERS_BUYER",
    ordersSeller = "ORDERS_SELLER",
}

interface Props {
    goodsContainerTitle?: any,
    goods: GoodInterface[],
    goodsContainerPosition?: GoodsContainerPosition
    func?: (id: string) => void
}

@observer
class GoodsContainer extends Component <Props> {
    @observable animate = true;

    render () {
        const {goods, goodsContainerPosition, goodsContainerTitle, ...rest} = this.props;

        return (
                <div className={classNames(style.goodsContainer, {[style.goodsContainer__padding]: !goodsContainerTitle} )}>
                {
                    goodsContainerTitle &&
                    <div className={style.goodsContainer__title}>
                        {goodsContainerTitle}
                    </div>
                }

                <div className={style.goodsContainer__grid}>
                    <TransitionGroup component={null}>
                    {
                        goods.map ( good =>
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
                                        goodsContainerPosition={goodsContainerPosition}
                                        {...rest}
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
