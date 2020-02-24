import React, {Component} from 'react';
import './HomePage.scss';
import GoodsPageStore from "../../stores/GoodsPageStore";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import AuthLinks from "../../components/AuthLinks/AuthLinks";
import RootStore from "../../stores/RootStore";


@observer
class HomePage extends Component{
    store: GoodsPageStore = new GoodsPageStore();

    componentDidMount(): void {
        this.store.loadGoods(8);
    }

    render(){
        const {user} = RootStore;

        return(
            <>
                <div className="header">
                    { user.authenticated ? (
                        <div className="header__info">
                            <div className="header__text">
                                Welcome, {user.name}!
                            </div>
                        </div>
                    ) : (
                        <AuthLinks/>
                    ) }

                </div>

                <div className="goodsContainer">
                    <GoodsContainer goodsContainerTitle="Top of marketplace" goods={this.store.goods}/>
                </div>
            </>
        )
    }
}

export default HomePage;
