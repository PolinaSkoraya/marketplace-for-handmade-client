import styles from './BuyerPage.module.scss';
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
            <div className={styles.profileContainer}>
                <div className={styles.profileContainer__aside}>
                    <div className={styles.sticky}>
                        <a className={styles.profileContainer__link} href="#basket">
                            basket
                        </a>
                        <a className={styles.profileContainer__link} href="#liked">
                            liked
                        </a>
                        <a className={styles.profileContainer__link} href="#orders">
                            orders
                        </a>
                    </div>
                </div>

                <div className={styles.profileContainer__main}>
                    <div className={styles.basketContainer} id="basket">
                        {
                            user.goodsInBasket[0]?
                            <>
                                <GoodsContainer
                                    goodsContainerTitle="Basket"
                                    goods={user.goodsInBasket}
                                    goodsContainerPosition={GoodsContainerPosition.basket}
                                />

                                <div className={styles.basketContainer__cost}>
                                    <FormattedMessage id="basketCost" values={{basketCost: user.basketCost}}/>
                                </div>
                            </>
                            :
                            <div className={styles.basketContainer__empty}>
                                <div className={styles.basketContainer__emptyMessage}>
                                    Your basket is empty! Click to go to the goods catalog
                                </div>

                                <NavLink to={ROUTES.goods.goods} className="">
                                    <img onClick={this.animate} className={styles.imgShoppingCart} src={basket} alt="shopping-cart"/>
                                </NavLink>
                            </div>
                        }
                    </div>


                    <div id="liked">
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
                    </div>

                    <div id="orders">
                        <OrdersContainer
                            goods={user.orders}
                            position={GoodsContainerPosition.ordersBuyer}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(BuyerPage);