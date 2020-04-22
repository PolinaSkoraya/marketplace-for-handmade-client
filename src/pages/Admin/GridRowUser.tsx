import { observer } from "mobx-react";
import React, { Component } from "react";
import { action } from "mobx";
import { deleteUserById } from "../../http/services";
import style from "./style.module.scss";
import { FormattedMessage } from "react-intl";
import Button from "../../components/Button/Button";
import classNames from "classnames";

@observer
class GridRowUser extends Component<{
  user: any;
  deleteUser: (userId) => void;
}> {
  render() {
      console.log(this.props);

      return (
      <div className={style.gridRow}>
        <div className="grid-column grid-column-0">
          <Button
            className={classNames(style.buttonDeleteUser, style.button)}
            onClick={() => this.props.deleteUser(this.props.user._id)}
          >
            <FormattedMessage id={"deleteUser"} />
          </Button>
        </div>
        <div>{this.props.user.name}</div>
        <div>{this.props.user.email}</div>
        <div>
          {this.props.user.roles.join(", ")}
        </div>
        <div>
          <div>
            {this.props.user.orders &&
              this.props.user.orders.map((order) => (
                <ul
                  className={style.orderList}
                  key={order.id + this.props.user.id}
                >
                  <li><FormattedMessage id="name"/> {order.name}</li>
                  <li><FormattedMessage id="price"/> {order.price}</li>
                  <li><FormattedMessage id="status"/> {order.status}</li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default GridRowUser;
