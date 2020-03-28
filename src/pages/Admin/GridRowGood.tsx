import {observer} from "mobx-react";
import React, {Component} from "react";
import {GoodInterface} from "../../stores/helpers/interfaces";
import OneGoodStore from "../../stores/OneGoodStore";
import {observable} from "mobx";
import style from "./style.module.scss";

@observer
class GridRowGood  extends Component<{good: GoodInterface, idSeller: string}> {
    oneGoodStore: OneGoodStore = new OneGoodStore();
    @observable sellerName = "";

    componentDidMount(): void {
        this.oneGoodStore.getShopName(this.props.idSeller).then( response =>
            this.sellerName = response
        )
    }

    render () {
        const {good} = this.props;

        return (
            <div className={style.gridRow}>
                <div className="grid-column grid-column-1">{good.name}</div>
                <div className="grid-column grid-column-2">{good.price}</div>
                <div className="grid-column grid-column-3">{good.category}</div>
                <div className="grid-column grid-column-4">{good.description}</div>
                <div className="grid-column grid-column-5">{this.sellerName}</div>
            </div>
        );
    }
}

export default GridRowGood;