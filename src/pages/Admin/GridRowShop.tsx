import {observer} from "mobx-react";
import React, {Component} from "react";
import {observable} from "mobx";
import {getSellerOrders, getUserById} from "../../http/services";
import style from "./style.module.scss";

@observer
class GridRowShop  extends Component<{seller: any}> {
    @observable orders;
    @observable owner;

    async componentDidMount() {
        let response = await getSellerOrders(this.props.seller._id);
        this.orders = response.data;

        let responseUser = await getUserById(this.props.seller.idUser);
        this.owner = responseUser.data.name;
    }

    render () {
        return (
            <div className={style.gridRow}>
                <div className="grid-column grid-column-0">{this.owner}</div>
                <div className="grid-column grid-column-1">{this.props.seller.name}</div>
                <div className="grid-column grid-column-2">{this.props.seller.description}</div>
                <div className="grid-column grid-column-3">
                    <div>
                        {
                            this.orders &&
                            this.orders.map ( order =>
                                <ul className={style.orderList} key={order._id + this.props.seller._id}>
                                    <li>name: {order.name}</li>
                                    <li>price: {order.price}</li>
                                    <li>status: {order.status}</li>
                                </ul>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default GridRowShop;
