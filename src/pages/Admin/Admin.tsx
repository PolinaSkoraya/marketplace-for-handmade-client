import './Admin.scss'
import {observer} from "mobx-react";
import React, {Component} from "react";
import RootStore from "../../stores/RootStore";
import Good from "../../components/Good/Good";
import GoodsStore from "../../stores/GoodsStore";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import OneGoodStore from "../../stores/OneGoodStore";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {observable} from "mobx";
import ReactDataGrid from "react-data-grid";

@observer
class Admin extends Component {
    goodsStore: GoodsStore = new GoodsStore();

    componentDidMount(): void {
        this.goodsStore.loadGoods(1);
    }

    render () {
        const {user} = RootStore;


        return (
            <>

                <div className="admin-page">
                    <div className="grid-container">
                        <div className="grid-row" key="0">
                            <div className="grid-column grid-column-1">name</div>
                            <div className="grid-column grid-column-2">price</div>
                            <div className="grid-column grid-column-3">description</div>
                            <div className="grid-column grid-column-4">seller</div>
                            {/*<div className="grid-column grid-column-5"></div>*/}
                        </div>
                        {
                            this.goodsStore.goods.map ( good =>
                                {
                                    return <GridRowGood good={good} idSeller={good.idSeller}  key={good._id}/>
                                }
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

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
            <div className="grid-row">
                <div className="grid-column grid-column-1">{good.name}</div>
                <div className="grid-column grid-column-2">{good.price}</div>
                <div className="grid-column grid-column-3">{good.description}</div>
                <div className="grid-column grid-column-4">{this.sellerName}</div>
            </div>
        );
    }
}

@observer
class GridRowUser  extends Component {

    componentDidMount(): void {

    }

    render () {

        return (
            <div className="grid-row">
                <div className="grid-column grid-column-1"></div>
                <div className="grid-column grid-column-2"></div>
                <div className="grid-column grid-column-3"></div>
                <div className="grid-column grid-column-4"></div>
            </div>
        );
    }
}

export default Admin;