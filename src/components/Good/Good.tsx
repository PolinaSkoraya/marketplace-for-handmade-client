import style from './style.module.scss';
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';
import {action, observable} from "mobx";
import {ROUTES} from "../../routes/routes";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {STATIC_IMAGES} from "../../http/urls";
import OneGoodStore from "../../stores/OneGoodStore";
import {GoodsContainerPosition} from "../GoodsContainer/GoodsContainer";
import {FormattedMessage} from 'react-intl';
import Modal from "../Modal/Modal";
import {FaRegLemon, FaTrash, FaPen} from "react-icons/fa";
import RootStore from "../../stores/RootStore";
import Button from "../Button/Button";
import UpdateGoodForm from "./UpdateGoodForm";
import classNames from 'classnames';

interface Props {
    good: GoodInterface,
    idSeller: string,
    goodsContainerPosition?: GoodsContainerPosition,
    shadow?: boolean
}

@observer
class Good extends Component<Props> {
    store = new OneGoodStore();
    @observable sellerName = "";
    @observable isShow = false;

    componentDidMount () : void {
        this.store.getShopName(this.props.idSeller)
            .then( response =>
                this.sellerName = response
            );
    }

    @action
    async deleteGood (user, id) {
        await user.removeFromBasket(id);
    }

    showModal = () => {
        this.isShow = true;
    };

    hideModal = () => {
        this.isShow = false;
    };

    render () {
        const {user} = RootStore;
        const {good, shadow, goodsContainerPosition, idSeller} = this.props;

        return (
            <div
                className={style.good}
                id = {good._id + good.idOrder}
                style = {shadow === false? {boxShadow: "none"}: {}}
            >
                <div className={style.good__buttons}>
                    {
                        good.idSeller === user.seller._id &&
                        goodsContainerPosition === GoodsContainerPosition.sellerPage &&
                        <>
                            <Button styleType="small" id={good.name} className={style.updateGoodButton} onClick={this.showModal}>
                                <FaPen/>
                            </Button>
                            <Modal
                                children = {<UpdateGoodForm good={good}/>}
                                goodName={good.name}
                                handleClose={this.hideModal}
                                isShow={this.isShow}
                            />
                        </>
                    }
                    {
                        goodsContainerPosition === GoodsContainerPosition.basket &&
                        <>
                            <Button
                                styleType="small"
                                id={good.name + "-remove"}
                                className="removeButton"
                                onClick={() => this.deleteGood(user, good._id)}
                            >
                                <FaTrash/>
                            </Button>

                            <Button
                                styleType="small"
                                id={good.name + "-addOrder"}
                                className="addOrderButton"
                                onClick={() => user.addOrder(user.id, good._id, idSeller)}
                            >
                                <FaRegLemon/>
                            </Button>
                        </>
                    }
                </div>

                <div className={style.good__image}>
                    <NavLink
                        className={style.good__linkImage}
                        to={ROUTES.goods.goods+ good._id}
                    >
                        <img src={STATIC_IMAGES + good.image } alt="knitting"/>
                    </NavLink>
                </div>

                <div className={style.good__about}>
                    <NavLink
                        to={ROUTES.goods.goods + good._id}
                        className={classNames(style.good__title, style.good__link)}
                    >
                        {good.name}
                    </NavLink>

                    <div className={style.good__info}>
                        <NavLink
                            to={ROUTES.sellers.sellers + idSeller}
                            className={classNames(style.good__link)}
                        >
                            {this.sellerName}
                        </NavLink>

                        <div className={style.good__price}>{good.price}$</div>
                    </div>

                    <div className={style.good__likes}>
                        <div>
                            <FormattedMessage id="likes" values={{likes: good.likes}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Good;

