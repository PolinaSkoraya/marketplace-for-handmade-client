import style from './style.module.scss';
import React, {Component} from 'react';
import {getRole, Roles} from "../../stores/helpers/roles";
import RootStore from "../../stores/RootStore";
import {GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import {OrdersContainer} from "../../components/OrdersContainer/OrdersContainer";
import {goodsCategories} from "../../stores/helpers/interfaces";
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';
import Button from "../../components/Button/Button";
import classNames from "classnames";
import {action, observable} from "mobx";
import {MdCancel} from "react-icons/md";
import {FormattedMessage} from "react-intl";

@observer
class SellerProfile extends Component {
    @observable isShowModal = false;

    @action.bound
    toggleForm () {
        console.log(this.isShowModal, "showModal");
        this.isShowModal = !this.isShowModal;
    }

    @action.bound
    async onCreateGood (user) {
        this.isShowModal = !this.isShowModal;
        await user.createGood();
    }

    render() {
        const {user} = RootStore;

        return (
            <div className={style.profileContainer}>
                {
                    getRole(Roles.seller) ?
                        <div className={style.profileContainer__header}>
                            <div className={style.profileContainer__info}>
                                <NavLink
                                    to={ROUTES.sellers.sellers + user.seller._id}
                                    className={style.profileContainer__title}
                                >
                                    {user.seller.name}
                                </NavLink>

                                <Button type="button" onClick={this.toggleForm} className={style.buttonShowModal}>create good</Button>
                            </div>

                            <form
                                className={classNames(style.createGoodForm, {[style.createGoodForm__show]: this.isShowModal})}
                            >
                                <Button type="button" styleType="small" onClick={this.toggleForm} className={style.createGoodForm__buttonClose}>
                                    <MdCancel/>
                                </Button>
                                <input
                                    className = {classNames("input", style.createGoodForm__input)}
                                    type='text'
                                    name="newGoodName"
                                    onChange={user.handleInputChange}
                                    placeholder='name'
                                />
                                <textarea
                                    className = {classNames("input", style.createGoodForm__input, style.createGoodForm__textarea)}
                                    name="newGoodDescription"
                                    onChange={user.handleInputChange}
                                    placeholder='description'
                                />
                                <input
                                    className = {classNames("input", style.createGoodForm__input)}
                                    type='text'
                                    name="newGoodPrice"
                                    onChange={user.handleInputChange}
                                    placeholder='price'
                                />
                                <select
                                    className = {classNames("input", style.createGoodForm__input)}
                                    name="newGoodCategory"
                                    onChange={user.handleInputChange}
                                    defaultValue="choose"
                                >
                                    <option disabled value="choose">Choose category</option>
                                    <option value={goodsCategories.art}>art</option>
                                    <option value={goodsCategories.accessories}>accessories</option>
                                    <option value={goodsCategories.homeware}>homeware</option>
                                    <option value={goodsCategories.toys}>toys</option>
                                </select>

                                <Button
                                    styleType="primary"
                                    onClick={()=>this.onCreateGood(user)}
                                >
                                    create new good
                                </Button>
                            </form>
                        </div>
                        :
                        <div >
                            <div>
                                <FormattedMessage id="shopInfo"/>
                            </div>
                            <input
                                className = "input"
                                type='text'
                                name="newShopName"
                                onChange={user.handleInputChange}
                                placeholder='shop name'
                            />
                            <textarea
                                className = "input"
                                name="newShopDescription"
                                onChange={user.handleInputChange}
                                placeholder='shop description'
                            />
                            <Button onClick={user.setSellerRole}>start selling</Button>
                        </div>
                }
                {
                    user.ordersOfSeller[0] &&
                    <OrdersContainer
                        title="processingOrders"
                        goods={user.ordersOfSeller.filter(good => good.status === "processing")}
                        position={GoodsContainerPosition.ordersSeller}
                    />
                }
                {
                    user.ordersOfSeller[0] &&
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