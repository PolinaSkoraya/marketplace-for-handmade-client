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
import {FaTrash, FaPen} from "react-icons/fa";
import {MdAttachMoney} from "react-icons/md";
import RootStore from "../../stores/RootStore";
import Button from "../Button/Button";
import classNames from 'classnames';
import ModalStore from "../../stores/ModalStore";
import UpdateGoodModal from "./UpdateGoodModal";
import {TiWarningOutline} from "react-icons/ti";
import {IconContext} from "react-icons";
import WarningModal from "../WarningModal/WarningModal";

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

    openModal = (good?) => async () => {
        const { payload } = await ModalStore.showModal(UpdateGoodModal, {good});

        await  this.store.update(payload);
        // await this.shopStore.initGoodsOfSeller(good.idSeller);
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

                            <Button
                                    styleType="small"
                                    id={good._id}
                                    className={style.updateGoodButton}
                                    onClick={this.openModal(good)}
                            >
                                <FaPen/>
                            </Button>
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
                                <IconContext.Provider value={{ className: style.moneyIcon }}>
                                    <MdAttachMoney/>
                                </IconContext.Provider>
                            </Button>
                        </>
                    }
                </div>

                <div className={style.good__image}>
                    <NavLink
                        className={style.good__linkImage}
                        to={ROUTES.goods.goods+ good._id}
                    >
                        <img src={good.image } alt="knitting"/>
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

