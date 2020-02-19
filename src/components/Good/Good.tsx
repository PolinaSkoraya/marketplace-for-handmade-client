import './Good.scss'
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {observer} from 'mobx-react';
import {action, observable} from "mobx";
import {getSellerById} from "../../http/services";
import {ROUTES} from "../../routes/routes";
import {GoodInterface} from "../../stores/interfaces";
import {STATIC_IMAGES} from "../../http/urls";

@observer
class Good extends Component<{good: GoodInterface, idSeller: string}> {
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
                <div className="good">
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

                        <div className="good__shop-info">
                            <NavLink
                                to={ROUTES.sellers.sellers + this.props.idSeller}
                                className="good__shop-name good__link"
                            >
                                {this.sellerName}
                            </NavLink>

                            <div className="good__price">{this.props.good.price}</div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Good;
