import "./SellerPage.scss"
import React, {Component} from "react";
import {observer} from "mobx-react";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";

import {STATIC_IMAGES} from "../../http/urls";
import {FormattedMessage} from "react-intl";
import {ShopStore} from "../../stores/ShopStore";

@observer
class SellerPage extends Component {
    store: ShopStore = new ShopStore();

    componentDidMount(): void {
        let props: any = this.props;
        this.store.initSeller(props.match.params.id);
        this.store.initGoodsOfSeller(props.match.params.id);
    }

    render () {
        return (
            <div className="seller-page">
                <div className="seller-profile">

                    <div className="seller-profile__header">
                        <div className="seller-profile__back-image">
                        </div>

                        <div className="seller-profile__info">
                            <div className="seller-profile__logo">
                                <img src={STATIC_IMAGES + this.store.seller.logo} alt="shop logo" className="seller-profile__logo-img"/>
                            </div>

                            <div className="seller-profile__text">
                                <div className="seller-profile__text-field seller-profile__text-field--name">
                                    {this.store.seller.name}
                                </div>
                                <div className="seller-profile__text-field seller-profile__text-field--services">
                                    <FormattedMessage id="services" values={{sellerServices: this.store.seller.services}}/>
                                </div>
                                <div className="seller-profile__text-field seller-profile__text-field--about-shop">
                                    <FormattedMessage id="aboutShop"/>
                                    <div className="seller-profile__description">
                                        {this.store.seller.description}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="seller-profile__body">
                        <GoodsContainer
                            goodsContainerTitle = {"Goods of " + this.store.seller.name}
                            goods={this.store.goodsOfSeller}
                            goodsContainerPosition={GoodsContainerPosition.sellerPage}
                        />
                    </div>

                    <div className="seller-profile__footer">

                    </div>

                </div>
            </div>
        )
    }
}

export default SellerPage;
