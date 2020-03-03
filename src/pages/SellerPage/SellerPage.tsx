import "./SellerPage.scss"
import React, {Component} from "react";
import {observer} from "mobx-react";
import {SellerStore} from "../../stores/SellerStore";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";

import shopLogo from "../../static/icons/h.svg"
import {STATIC_IMAGES} from "../../http/urls";

@observer
class SellerPage extends Component {
    store: SellerStore = new SellerStore();

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
                                <div className="seller-profile__text-field seller-profile__text-field--name">{this.store.seller.name}</div>
                                <div className="seller-profile__text-field seller-profile__text-field--services">Services: {this.store.seller.services}</div>
                                <div className="seller-profile__text-field seller-profile__text-field--about-shop">
                                    About shop:
                                    <div className="seller-profile__description">
                                        {this.store.seller.description}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="seller-profile__body">
                        <GoodsContainer goodsContainerTitle = {"Goods of " + this.store.seller.name} goods={this.store.goodsOfSeller}/>
                    </div>

                    <div className="seller-profile__footer">
                        <div>
                            <form onSubmit={this.store.createGood} >
                                <input
                                    className = ''
                                    type='text'
                                    name="name"
                                    onChange={this.store.handleInputChange}
                                    placeholder='name'
                                />
                                <textarea
                                    className = ''
                                    name="description"
                                    onChange={this.store.handleInputChange}
                                    placeholder='description'
                                />
                                <input
                                    className = ''
                                    type='text'
                                    name="price"
                                    onChange={this.store.handleInputChange}
                                    placeholder='price'
                                />
                                <input type="submit" value="create good"/>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SellerPage;
