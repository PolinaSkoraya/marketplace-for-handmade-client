import "./GoodsPage.scss"
import React, {Component} from "react";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import GoodsPageStore from "../../stores/GoodsPageStore";
import RootStore from "../../stores/RootStore";
import AuthLinks from "../../components/AuthLinks/AuthLinks";
import {ROUTES} from "../../routes/routes";
import {Redirect} from 'react-router-dom'

@observer
class GoodsPage extends Component{
    store: GoodsPageStore = new GoodsPageStore();

    componentDidMount(): void {
        this.store.loadGoods();
    }

    render(){
        const {user} = RootStore;

        return (
            <>
                { user.authenticated ? (
                    <div className="goods-page">
                        <GoodsContainer goodsContainerTitle="All Goods" goods={this.store.goods}/>

                    </div>
                ) : (
                    <Redirect to={ROUTES.buyers.login}/>
                ) }
            </>
        )
    }
}

export {GoodsPage};
