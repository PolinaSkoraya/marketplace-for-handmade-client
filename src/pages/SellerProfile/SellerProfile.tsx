import style from './style.module.scss';
import React, {Component} from 'react';
import {getRole, Roles} from "../../stores/helpers/roles";
import RootStore from "../../stores/RootStore";
import {GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import {OrdersContainer} from "../../components/OrdersContainer/OrdersContainer";
import Button from "../../components/Button/Button";
import classNames from "classnames";
import {FormattedMessage} from "react-intl";
import styles from "../BuyerPage/style.module.scss";
import fileIcon from "../../static/icons/svg/emptyFile.svg";

@observer
class SellerProfile extends Component {
    render() {
        const {user} = RootStore;

        return (
            <div className={style.profileContainer}>
                {
                    getRole(Roles.seller) ?
                        <div className={style.shopName}>
                            <FormattedMessage id="shop" values={{shopName: user.seller.name}}/>
                        </div>
                        :
                        <div  className={style.profileContainer__form}>
                            <div className={style.profileContainer__formTitle}>
                                <FormattedMessage id="shopInfo"/>
                            </div>
                            <input
                                className = {classNames("input", style.profileContainer__input)}
                                type='text'
                                name="newShopName"
                                onChange={user.handleInputChange}
                                placeholder='shop name'
                                autoFocus
                            />
                            <textarea
                                className = {classNames("input", style.profileContainer__textarea, style.profileContainer__input)}
                                name="newShopDescription"
                                onChange={user.handleInputChange}
                                placeholder='shop description'
                            />
                            <Button onClick={user.setSellerRole}>start selling</Button>
                        </div>
                }
                {
                    user.ordersOfSeller.length === 0 &&
                    <div className={style.profileContainer__message}>
                        <div className={style.profileContainer__messageText}>
                            You have no orders
                        </div>

                        <div className={style.profileContainer__messageIcon}>
                            <img className={styles.imgShoppingCart} src={fileIcon} alt="shopping-cart"/>
                        </div>
                    </div>
                }
                {
                    user.ordersOfSeller.filter(good => good.status === "processing").length !== 0 &&
                    <OrdersContainer
                        title="processingOrders"
                        goods={user.ordersOfSeller.filter(good => good.status === "processing")}
                        position={GoodsContainerPosition.ordersSeller}
                    />
                }
                {
                    user.ordersOfSeller.filter(good => good.status === "accepted").length !== 0 &&
                    <OrdersContainer
                        title="acceptedOrders"
                        goods={user.ordersOfSeller.filter(good => good.status === "accepted")}
                        position={GoodsContainerPosition.ordersSeller}
                    />
                }
            </div>
        )
    }
}

export default SellerProfile;