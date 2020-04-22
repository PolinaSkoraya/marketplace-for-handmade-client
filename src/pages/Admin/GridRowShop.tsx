import { observer } from "mobx-react";
import React, { Component } from "react";
import { observable } from "mobx";
import { getSellerOrders, getUserById } from "../../http/services";
import style from "./style.module.scss";
import {FormattedMessage} from "react-intl";

@observer
class GridRowShop extends Component<{ seller: any }> {
  @observable orders;
  @observable owner;

  async componentDidMount() {
    let response = await getSellerOrders(this.props.seller.id);
    this.orders = response.data;

    let responseUser = await getUserById(this.props.seller.idUser);
    this.owner = responseUser.data.name;
  }

  render() {
    return (
      <div className={style.gridRow}>
        <div>{this.owner}</div>
        <div>
          {this.props.seller.name}
        </div>
        <div>
          {this.props.seller.description}
        </div>
        <div>
          <div>
            {this.orders &&
              this.orders.map((order) => (
                <ul
                    className={style.orderList}
                    key={order.id}
                >
                  <li>
                      <FormattedMessage id="name"/>
                      {order.name}
                  </li>
                  <li>
                      <FormattedMessage id="price"/>
                      {order.price}
                  </li>
                  <li>
                      <FormattedMessage id="status"/>
                      {order.status}
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default GridRowShop;
