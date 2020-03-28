import {observer} from "mobx-react";
import React, {Component} from "react";
import {GoodInterface} from "../../stores/helpers/interfaces";
import style from "./style.module.scss";

@observer
class GridRowOrder  extends Component<{order: GoodInterface}> {
    render () {
        const {order} = this.props;

        return (
            <div className={style.gridRow}>
                <div className="grid-column ">{order.name}</div>
                <div className="grid-column ">{order.price}</div>
                <div className="grid-column ">{order.status}</div>
            </div>
        );
    }
}

export default GridRowOrder;