import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './OneGoodPage.scss';
import OneGoodStore from "../../stores/OneGoodStore";
import {observer} from "mobx-react";

import {STATIC_IMAGES} from "../../http/urls";
import {FaHeart} from "react-icons/fa";

import {FormattedMessage} from "react-intl";
import RootStore from "../../stores/RootStore";

@observer
class OneGoodPage extends Component<any> {
    store = new OneGoodStore();

    async componentDidMount() {
        const {match}  = this.props;
        await this.store.initGood(match.params.id);
    }

    render () {
        const {user} = RootStore;

        return(
            <div className="good-page">
                <div className="good-page__title">
                    {this.store.good.name}
                </div>

                <div className="good-page__info">

                    <div className="good-page__info-left card-front">
                        <img className="good-page__image" src={STATIC_IMAGES + this.store.good.image} alt="image"/>
                    </div>

                    <div className="good-page__info-right">
                        <div className="good-page__price">
                            <FormattedMessage id="price" values={{price: this.store.good.price}}/>
                        </div>

                        <div className="good-page__buttons">

                            {
                                this.store.isInBasket ?
                                    <button className="button-basic button-addToBasket" onClick={() => user.removeFromBasket(this.store.good._id)}>
                                        remove from basket
                                    </button>
                                    :
                                    <button className="button-basic button-addToBasket" onClick={this.store.addToBasket}>
                                        add to basket
                                    </button>
                            }

                            {
                                this.store.isLiked ?
                                    <button className="button-like button-like--liked" onClick={this.store.removeFromLikedGoods}>
                                        <FaHeart />
                                    </button>
                                    :
                                    <button className="button-like button-like--unliked" onClick={this.store.addToLikedGoods}>
                                        <FaHeart />
                                    </button>
                            }
                            {this.store.good.likes}

                        </div>

                        <div className="good-page__shop-info">
                            <img className="shop-info__image" src={STATIC_IMAGES + this.store.good.seller.logo} alt="shop logo"/>
                            <div className="shop-info__text">
                                <NavLink
                                    to={"/sellers/" + this.store.good.idSeller}
                                    className="good__shop-name"
                                >
                                    <FormattedMessage id="shop" values={{shopName: this.store.good.seller.name}}/>
                                </NavLink>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="good-page__description">
                    <div className="good-page__description-category">
                        <FormattedMessage id="category"/>
                        {this.store.good.category}
                    </div>
                    <div className="good-page__description-title">
                        <FormattedMessage id="description"/>
                    </div>
                    <div className="good-page__description-text">
                        {this.store.good.description}
                    </div>
                </div>

            </div>
        )
    }
}

export default OneGoodPage;