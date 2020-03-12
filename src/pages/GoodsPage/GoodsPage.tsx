import "./GoodsPage.scss"
import React, {Component} from "react";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import GoodsStore from "../../stores/GoodsStore";
import RootStore from "../../stores/RootStore";
import {ROUTES} from "../../routes/routes";
import {Redirect} from 'react-router-dom'

@observer
class GoodsPage extends Component{
    store: GoodsStore = new GoodsStore();

    componentDidMount(): void {
        this.store.loadGoods();
    }

    render(){
        const {user} = RootStore;

        return (
            <>
                {/*{ user.authenticated ? (*/}
                    <div className="goods-page">
                        <GoodsContainer goodsContainerTitle="All Goods" goods={this.store.goods}/>
                    </div>
                {/*) : (*/}
                {/*    <Redirect to={ROUTES.users.login}/>*/}
                {/*) }*/}
            </>
        )
    }
}

export {GoodsPage};
