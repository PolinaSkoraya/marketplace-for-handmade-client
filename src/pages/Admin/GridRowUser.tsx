import {observer} from "mobx-react";
import React, {Component} from "react";
import {action} from "mobx";
import {deleteUserById} from "../../http/services";
import style from "./style.module.scss";
import {FormattedMessage} from "react-intl";
import Button from "../../components/Button/Button";
import classNames from "classnames";

@observer
class GridRowUser  extends Component<{user: any, deleteUser: (userId) => void}> {
    render () {
        return (
            <div className={style.gridRow}>
                <div className="grid-column grid-column-0">
                    <Button className={classNames(style.buttonDeleteUser, style.button)} onClick={() => this.props.deleteUser(this.props.user._id)}>
                        <FormattedMessage id={"deleteUser"}/>
                    </Button>
                </div>
                <div className="grid-column grid-column-1">{this.props.user.name}</div>
                <div className="grid-column grid-column-2">{this.props.user.email}</div>
                <div className="grid-column grid-column-3">{this.props.user.roles.join(', ')}</div>
                <div className="grid-column grid-column-4">
                    <div>
                        {
                            this.props.user.orders &&
                            this.props.user.orders.map ( order =>
                                <ul className={style.orderList} key={order._id + this.props.user._id}>
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

export default GridRowUser;