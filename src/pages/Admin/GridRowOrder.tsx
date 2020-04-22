import { observer } from "mobx-react";
import React, { Component } from "react";
import { IGood } from "../../stores/helpers/interfaces";
import style from "./style.module.scss";

@observer
class GridRowOrder extends Component<{ order: IGood }> {
  render() {
    const { order } = this.props;

    return (
      <div className={style.gridRow}>
        <div>{order.name}</div>
        <div>{order.price}</div>
        <div>{order.status}</div>
      </div>
    );
  }
}

export default GridRowOrder;
