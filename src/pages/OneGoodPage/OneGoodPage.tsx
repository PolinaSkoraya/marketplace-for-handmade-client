import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import style from './style.module.scss';
import OneGoodStore from "../../stores/OneGoodStore";
import {observer} from "mobx-react";
import {FaHeart} from "react-icons/fa";
import {FormattedMessage} from "react-intl";
import RootStore from "../../stores/RootStore";
import Button from "../../components/Button/Button";
import classNames from "classnames";
import {observable} from "mobx";
import {getGoodsOfSeller} from "../../http/services";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {ROUTES} from "../../routes/routes";

@observer
class OneGoodPage extends Component<any> {
    store = new OneGoodStore();
    @observable sellerGoods: GoodInterface[] = [];

    async componentDidMount() {
        console.log("page");
        const {match}  = this.props;
        await this.store.initGood(match.params.id);

        try {
            const response = await getGoodsOfSeller(this.store.good.seller._id);
            this.sellerGoods = response.data;
        } catch (error) {
            console.log(error);
        }
    }

    render () {
        const {user} = RootStore;

        return (
            <>
                <div className={style.goodPage}>
                    <div className={classNames(style.goodPage__section, style.goodPage__sectionGood)}>
                        <div className={style.content}>
                            <div className={style.image__div}>
                                <img className={style.goodPage__image} src={this.store.good.image} alt="image"/>

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

                            <div className={style.goodOptions}>
                                <div className={style.goodOptions__name}>
                                    {this.store.good.name}
                                </div>

                                <div className={style.goodPage__price}>
                                    <div>
                                        <FormattedMessage id="price" values={{price: this.store.good.price}}/>
                                    </div>
                                    <div className={style.priceNumber}>{this.store.good.price}$</div>
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
                            </div>
                        </div>
                    </div>

                    <div className={classNames(style.goodPage__section, style.goodPage__sectionDescription)}>
                        <div className={style.goodPage__descriptionTitle}>
                            <FormattedMessage id="description"/>
                        </div>

                        <div className={style.goodPage__descriptionText}>
                            {this.store.good.description}
                        </div>

                        {
                            this.store.good.photos.length !== 0 &&
                            <div className={style.itemsRow}>
                                <div className={style.item}>
                                    <img src={this.store.good.photos[0]} alt="descPhoto"/>
                                </div>
                                <div className={style.item}>
                                    <img src={this.store.good.photos[1]} alt="descPhoto"/>
                                </div>
                                <div className={style.item}>
                                    <img src={this.store.good.photos[2]} alt="descPhoto"/>
                                </div>
                                <div className={style.item}>
                                    <img src={this.store.good.photos[3]} alt="descPhoto"/>
                                </div>
                            </div>
                        }
                    </div>

                    <div className={classNames(style.goodPage__section, style.goodPage__sectionShop)}>
                        <div className={style.shopName}>
                            <NavLink
                                to={ROUTES.sellers.sellers + this.store.good.idSeller}
                                className={style.shopLink}
                            >
                                <FormattedMessage id="shop" values={{shopName: this.store.good.seller.name}}/>
                            </NavLink>
                        </div>

                        <div className={style.shopDescription}>
                            {this.store.good.seller.description}
                        </div>

                        <div className={style.sellerGoods}>
                        {
                            this.sellerGoods.length !== 0 &&
                            this.sellerGoods.slice(0, 4).map ( good =>
                                <div key={good._id + "gallery"} className={style.sellerGoods__good}>
                                    <NavLink to={ROUTES.goods.goods + good._id}>
                                        <img
                                            className={style.sellerGoods__image}
                                            src={good.image}
                                            alt={good.image}
                                        />
                                    </NavLink>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default OneGoodPage;