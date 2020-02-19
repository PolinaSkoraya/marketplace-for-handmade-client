import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './OneGoodPage.scss';
import OneGoodPageStore from "../../stores/OneGoodPageStore";
import {observer} from "mobx-react";

import likeSVG from "../../static/icons/heart-regular.svg";

import {STATIC_IMAGES} from "../../http/urls";

@observer
class OneGoodPage extends Component<any> {
    store = new OneGoodPageStore();

    componentDidMount(): void {
        const {match}  = this.props;
        this.store.initGood(match.params.id);

    }

    render () {
        return(
            <div className="good-page">
                <div className="good-page__title">
                    {this.store.good.name}
                </div>

                <div className="good-page__info">
                    <div className="good-page__info-left">
                        <img className="good-page__image" src={STATIC_IMAGES + this.store.good.image} alt="image"/>
                    </div>

                    <div className="good-page__info-right">
                        <div className="good-page__price">
                            Price: {this.store.good.price}
                        </div>

                        <div className="good-page__buttons">
                            <button className="button-addToBasket">Add to basket</button>
                            <label>
                                <input className="button-like"
                                       type="checkbox"
                                >
                                </input>

                            </label>
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