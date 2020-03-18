import './Order.scss'
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';
import RootStore from "../../stores/RootStore";
import OneGoodStore from "../../stores/OneGoodStore";
import {action, observable} from "mobx";
import {GoodsContainerPosition} from "../GoodsContainer/GoodsContainer";
import SmallButton from "../SmallButton/SmallButton";
import {FaRegSquare} from "react-icons/fa";
import {MdDone} from "react-icons/md";
import {ROUTES} from "../../routes/routes";
import {STATIC_IMAGES} from "../../http/urls";
import {FormattedMessage} from "react-intl";
import {GoodInterface} from "../../stores/helpers/interfaces";

@observer
class Order extends Component<{good: GoodInterface, idSeller: string, position?: GoodsContainerPosition}> {
    store = new OneGoodStore();
    @observable sellerName = "";

    constructor (props) {
        super(props);
        this.store.initUpdatingGood(this.props.good);
    }

    componentDidMount () : void {
        this.store.getShopName(this.props.idSeller)
            .then( response =>
                this.sellerName = response
            );
    }

    @action.bound
    update (id) {
        this.store.update(id);
    }

    @action
    deleteGood(user, id){
        user.removeFromBasket(this.props.good._id);
    }

    render () {
        const {user} = RootStore;

        return(
                <div className="order"  id = {this.props.good._id + this.props.good.idOrder}>
                    <div className="order__image">
                        <img src={STATIC_IMAGES + this.props.good.image } alt="knitting"/>
                    </div>

                    <div className="order__about">
                        <NavLink
                            to={ROUTES.goods.goods + this.props.good._id}
                            className="order__title order__link"
                        >
                            {this.props.good.name}
                        </NavLink>

                        <div className="order__info">
                            <NavLink
                                to={ROUTES.sellers.sellers + this.props.idSeller}
                                className="order__shop-name order__link"
                            >
                                {this.sellerName}
                            </NavLink>

                            <div className="order__price">{this.props.good.price}$</div>

                            <div className="order__buttons">
                                <p>status: {this.props.good.status}</p>
                                {
                                    this.props.good.status === "accepted" &&
                                    <>
                                        <button id="button-done-order" onClick={ () => {user.deleteOrder(this.props.good.idOrder)}}/>
                                        <SmallButton style={{color: "black"}} htmlFor="button-done-order" icon={<MdDone/>}/>
                                    </>
                                }
                                {
                                    this.props.good.status === "processing" &&
                                    this.props.position === GoodsContainerPosition.ordersSeller &&
                                    <>
                                        <button
                                            id={this.props.good.idOrder}
                                            className="updateOrderState"
                                            onClick={() => user.acceptOrder(this.props.good.idOrder)}
                                        >
                                        </button>
                                        <SmallButton htmlFor={this.props.good.idOrder as string} icon={<FaRegSquare/>}/>
                                    </>
                                }
                            </div>
                        </div>

                    </div>
                </div>
        )
    }
}

export default Order;