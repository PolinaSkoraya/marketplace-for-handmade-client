import "./GoodsPage.scss"
import React, {Component} from "react";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import GoodsPageStore from "../../stores/GoodsPageStore";

@observer
class GoodsPage extends Component{
    store: GoodsPageStore = new GoodsPageStore();

    componentDidMount(): void {
        this.store.loadGoods();
    }

    render(){
        return (
            <div className="goods-page">
                <GoodsContainer goodsContainerTitle="All Goods" goods={this.store.goods}/>

            </div>
        )
    }
}

export {GoodsPage};
