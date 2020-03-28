import style from "./style.module.scss"
import React, {Component} from "react";
import {observer} from "mobx-react";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {STATIC_IMAGES} from "../../http/urls";
import {FormattedMessage} from "react-intl";
import {ShopStore} from "../../stores/ShopStore";
import classNames from "classnames";

@observer
class SellerPage extends Component {
    store: ShopStore = new ShopStore();

    async componentDidMount() {
        let props: any = this.props;
        await this.store.initSeller(props.match.params.id);
        await this.store.initGoodsOfSeller(props.match.params.id);
    }

    render () {
        return (
            <div className={style.sellerPage}>
                <div className="sellerrPage__header">
                    <div className={style.sellerPage__backImage}> </div>

                    <div className={style.sellerPage__info}>
                        <div className={style.sellerPage__logo}>
                            <img src={STATIC_IMAGES + this.store.seller.logo} alt="shop logo" className={style.sellerPage__logoImg}/>
                        </div>

                        <div className={style.sellerPage__text}>
                            <div className={classNames(style.sellerPage__textField, style.sellerPage__textField_name)}>
                                {this.store.seller.name}
                            </div>
                            <div className={style.sellerPage__textField}>
                                <FormattedMessage id="services" values={{sellerServices: this.store.seller.services}}/>
                            </div>
                            <div className={style.sellerPage__textField}>
                                <FormattedMessage id="aboutShop"/>
                                <div className={style.sellerPage__description}>
                                    {this.store.seller.description}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={style.sellerPage__body}>
                    <GoodsContainer
                        goodsContainerTitle = {"Goods of " + this.store.seller.name}
                        goods={this.store.goodsOfSeller}
                        goodsContainerPosition={GoodsContainerPosition.sellerPage}
                    />
                </div>
            </div>
        )
    }
}

export default SellerPage;
