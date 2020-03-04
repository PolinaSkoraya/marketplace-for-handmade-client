import './Good.scss'
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {inject, observer} from 'mobx-react';
import {action, observable} from "mobx";
import {getSellerById} from "../../http/services";
import {ROUTES} from "../../routes/routes";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {STATIC_IMAGES} from "../../http/urls";
import OneGoodStore from "../../stores/OneGoodStore";
import {FaHeart} from "react-icons/fa";
import {GoodsContainerPosition} from "../GoodsContainer/GoodsContainer";
import {FormattedMessage} from 'react-intl';

@observer
class Good extends Component<{good: GoodInterface, idSeller: string, key, goodsContainerPosition?: GoodsContainerPosition}> {
    store = new OneGoodStore();
    @observable sellerName = "";

    constructor (props) {
        super(props);

        this.getShopName(this.props.idSeller);
    }

    @action.bound
    async getShopName (id) {
        try {
            const responseSeller = await getSellerById(id);
            this.sellerName = responseSeller.data.name;
        } catch (error) {
            console.log(error);
        }
    }

    render () {
        return(
                <div className="good" id={this.props.good._id}>
                    {
                        this.props.goodsContainerPosition === GoodsContainerPosition.basket ?
                            <button className="" onClick={() => this.store.removeFromBasket(this.props.good._id)}>
                                remove from basket
                            </button>
                            :
                            <></>
                    }
                    <div className="good__image">
                        <NavLink
                            className="good__link-image"
                            to={ROUTES.goods.goods+ this.props.good._id}
                        >
                            <img src={STATIC_IMAGES + this.props.good.image } alt="knitting"/>
                        </NavLink>
                    </div>

                    <div className="good__about">
                        <NavLink
                            to={ROUTES.goods.goods + this.props.good._id}
                            className="good__title good__link"
                        >
                            {this.props.good.name}
                        </NavLink>

                        <div className="good__info">
                            <NavLink
                                to={ROUTES.sellers.sellers + this.props.idSeller}
                                className="good__shop-name good__link"
                            >
                                {this.sellerName}
                            </NavLink>

                            <div className="good__price">{this.props.good.price}$</div>
                        </div>

                        <div className="good__likes">
                            <div>
                                <FormattedMessage id="likes" values={{likes: this.props.good.likes}}/>
                            </div>
                        </div>

                    </div>
                </div>
        )
    }
}

export default Good;
