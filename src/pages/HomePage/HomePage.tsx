import React, {Component, Fragment} from 'react';
import './HomePage.scss';
import GoodsPageStore from "../../stores/GoodsPageStore";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import AuthLinks from "../../components/AuthLinks/AuthLinks";


@observer
class HomePage extends Component{
    store: GoodsPageStore = new GoodsPageStore();

    componentDidMount(): void {
        this.store.loadGoods(8);
    }

    render(){
        return(
            <Fragment>
                <div className="header">
                    <AuthLinks/>
                </div>

                <div className="goodsContainer">
                    <GoodsContainer goodsContainerTitle="Top of marketplace" goods={this.store.goods}/>
                </div>
            </Fragment>
        )
    }
}

export default HomePage
