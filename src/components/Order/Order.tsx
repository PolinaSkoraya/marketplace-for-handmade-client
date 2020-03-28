import style from './style.module.scss';
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';
import RootStore from "../../stores/RootStore";
import OneGoodStore from "../../stores/OneGoodStore";
import {action, observable} from "mobx";
import {GoodsContainerPosition} from "../GoodsContainer/GoodsContainer";
import {FaRegSquare} from "react-icons/fa";
import {MdDone} from "react-icons/md";
import {ROUTES} from "../../routes/routes";
import {STATIC_IMAGES} from "../../http/urls";
import {GoodInterface} from "../../stores/helpers/interfaces";
import Button from "../Button/Button";
import classNames from 'classnames';

interface Props {
    good: GoodInterface,
    idSeller: string,
    position?: GoodsContainerPosition
}

@observer
class Order extends Component<Props> {
    store = new OneGoodStore();
    @observable sellerName = "";

    componentDidMount () : void {
        this.store.getShopName(this.props.idSeller)
            .then( response =>
                this.sellerName = response
            );
    }

    @action
    async doneOrder(user, good) {
        await user.deleteOrder(good.idOrder);
    }

    render () {
        const {user} = RootStore;
        const {idSeller, good, position} =this.props;

        return(
                <div className={style.order}  id = {good._id + good.idOrder}>
                    <div className={style.order__image}>
                        <img src={STATIC_IMAGES + good.image } alt="knitting"/>
                    </div>

                    <div className={style.order__about}>
                        <NavLink
                            to={ROUTES.goods.goods + good._id}
                            className={classNames(style.order__title, style.order__link)}
                        >
                            {good.name}
                        </NavLink>

                        <div className={style.order__info}>
                            <NavLink
                                to={ROUTES.sellers.sellers + idSeller}
                                className={style.order__link}
                            >
                                {this.sellerName}
                            </NavLink>

                            <div className={style.orderPrice}>{good.price}$</div>

                            <div className="order__buttons">
                                <p>status: {good.status}</p>
                                {
                                    good.status === "accepted" &&
                                    position === GoodsContainerPosition.ordersBuyer &&
                                    <div className={style.order__buttonsDone}>
                                        <p>done order</p>
                                        <Button
                                            styleType="small"
                                            id="button-done-order"
                                            className="addOrderButton"
                                            onClick={ () => user.deleteOrder(good.idOrder)}
                                        >
                                            <MdDone/>
                                        </Button>
                                    </div>
                                }
                                {
                                    good.status === "processing" &&
                                    position === GoodsContainerPosition.ordersSeller &&
                                    <>
                                        <Button
                                            styleType="small"
                                            id={good.idOrder}
                                            className="updateOrderState"
                                            onClick={() => user.acceptOrder(good.idOrder)}
                                        >
                                            <FaRegSquare/>
                                        </Button>
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