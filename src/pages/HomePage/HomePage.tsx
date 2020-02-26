import React, {Component} from 'react';
import './HomePage.scss';
import GoodsStore from "../../stores/GoodsStore";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import AuthLinks from "../../components/AuthLinks/AuthLinks";
import RootStore from "../../stores/RootStore";


@observer
class HomePage extends Component{
    store: GoodsStore = new GoodsStore();

    async componentDidMount() {
        await this.store.loadGoods();

    }

    render(){
        const {user} = RootStore;

        return(
            <>
                <div className="header">
                    { user.authenticated ? (
                        <>
                            <div className="header__info">
                                <div className="header__text">
                                    Welcome, {user.name}!
                                </div>
                            </div>

                        </>
                    ) : (
                        <AuthLinks/>
                    ) }

                </div>

                <div className="goodsContainer">
                    <GoodsContainer goodsContainerTitle="All goods" goods={this.store.goods}/>
                </div>
            </>
        )
    }
}

export default HomePage;
