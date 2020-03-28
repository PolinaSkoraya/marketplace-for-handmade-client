import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import style from './style.module.scss';
import OneGoodStore from "../../stores/OneGoodStore";
import {observer} from "mobx-react";
import {STATIC_IMAGES} from "../../http/urls";
import {FaHeart} from "react-icons/fa";
import {FormattedMessage} from "react-intl";
import RootStore from "../../stores/RootStore";
import Button from "../../components/Button/Button";
import classNames from "classnames";

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
            <div className={style.goodPage}>
                <div className={style.goodPage__info}>
                    <div className={style.goodPage__infoLeft}>
                        <div className={style.image__div}>
                            <img className={style.goodPage__image} src={STATIC_IMAGES + this.store.good.image} alt="image"/>

                            <div className={style.buttonLike__div}>
                                {
                                    this.store.isLiked ?
                                        <Button styleType="small" className={classNames(style.buttonLike, style.buttonLike_liked)} onClick={this.store.removeFromLikedGoods}>
                                            <FaHeart />
                                        </Button>
                                        :
                                        <Button styleType="small" className={classNames(style.buttonLike, style.buttonLike_unliked)} onClick={this.store.addToLikedGoods}>
                                            <FaHeart />
                                        </Button>
                                }
                            </div>
                        </div>
                    </div>

                    <div className={style.goodPage__infoRight}>
                        <div className={style.info}>
                            <div className={style.goodPage__title}>
                                {this.store.good.name}
                            </div>

                            <div className={style.goodPage__price}>
                                <FormattedMessage id="price" values={{price: this.store.good.price}}/>
                                <p className={style.priceNumber}>{this.store.good.price}$</p>
                            </div>

                            <div className={style.goodPage__buttons}>
                                {
                                    this.store.isInBasket ?
                                        <Button
                                            className={style.buttonAddToBasket}
                                            onClick={() => user.removeFromBasket(this.store.good._id)}
                                        >
                                            remove from basket
                                        </Button>
                                        :
                                        <Button
                                            className={style.buttonAddToBasket}
                                            onClick={this.store.addToBasket}
                                        >
                                            add to basket
                                        </Button>
                                }
                            </div>

                            <div className={style.goodPage__shopInfo}>
                                <img className={style.shopInfo__image} src={STATIC_IMAGES + this.store.good.seller.logo} alt="shop logo"/>
                                <div className="shop-info__text">
                                    <NavLink
                                        to={"/sellers/" + this.store.good.idSeller}
                                    >
                                        <FormattedMessage id="shop" values={{shopName: this.store.good.seller.name}}/>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={style.goodPage__description}>
                    <div className={style.goodPage__descriptionCategory}>
                        <FormattedMessage id="category"/>
                        {this.store.good.category}
                    </div>

                    <div className={style.goodPage__descriptionTitle}>
                        <FormattedMessage id="description"/>
                    </div>

                    <div className={style.goodPage__descriptionText}>
                        {this.store.good.description}
                    </div>
                </div>
            </div>
        )
    }
}

export default OneGoodPage;