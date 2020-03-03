import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './OneGoodPage.scss';
import OneGoodStore from "../../stores/OneGoodStore";
import {observer} from "mobx-react";

import {STATIC_IMAGES} from "../../http/urls";
import RootStore from "../../stores/RootStore";

import {FaHeart} from "react-icons/fa"

const {user} = RootStore;

@observer
class OneGoodPage extends Component<any> {
    store = new OneGoodStore();

    async componentDidMount() {
        const {match}  = this.props;
        await this.store.initGood(match.params.id);

    }

    render () {

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
                            Price: {this.store.good.price}$
                        </div>

                        <div className="good-page__buttons">

                            {
                                this.store.isInBasket ?
                                    <button className="button-addToBasket" onClick={this.store.removeFromBasket}>remove from basket</button>
                                    :
                                    <button className="button-addToBasket" onClick={this.store.addToBasket}>add to basket</button>
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
                                    Shop: {this.store.good.seller.name}
                                </NavLink>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="good-page__description">
                    <div className="good-page__description-title">
                        Description:
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