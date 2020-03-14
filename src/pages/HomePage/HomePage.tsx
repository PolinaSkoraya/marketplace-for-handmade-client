import React, {Component} from 'react';
import './HomePage.scss';
import GoodsStore from "../../stores/GoodsStore";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import AuthLinks from "../../components/AuthLinks/AuthLinks";
import RootStore from "../../stores/RootStore";
import {FormattedMessage} from 'react-intl';

import icon1 from "../../static/icons/svg/026-handmade.svg";
import icon2 from "../../static/icons/svg/010-ball-of-wool.svg";
import icon3 from "../../static/icons/svg/014-button-1.svg";

import Parallax from  "parallax-js";
import logo from "../../static/icons/diy.svg";
import {action, observable} from "mobx";
import SmallButton from "../../components/SmallButton/SmallButton";
import Pagination from "../../components/Pagination/Pagination";


@observer
class HomePage extends Component{
    store: GoodsStore = new GoodsStore();
    @observable currentPage = 1;
    @observable numberOfPages = 0;

    async componentDidMount () {
        const response = await this.store.loadGoods(this.currentPage);
        this.numberOfPages = response;
        // let scene = document.getElementById('scene');
        // let parallaxInstance = new Parallax(scene, {
        //     relativeInput: true,
        //     hoverOnly: true,
        //     selector: ".item"
        // });
    }

    @action.bound
    async previousPage () {
        this.currentPage = this.currentPage - 1;
        await this.store.loadGoods(this.currentPage);
        console.log(this.currentPage);
    }

    @action.bound
    async nextPage () {
        this.currentPage = this.currentPage + 1;
        await this.store.loadGoods(this.currentPage);
        console.log(this.currentPage);
    }

    @action.bound
    async setPage (page) {
        this.currentPage = page;
        await this.store.loadGoods(this.currentPage);
        console.log(this.currentPage);
    }

    render () {
        const {user} = RootStore;
        console.log(this.numberOfPages);
        return(
            <>
                <div className="header">
                    { user.authenticated ? (
                        <>
                            <div className="header__info">
                                {/*<div className="header__text">*/}
                                {/*    <FormattedMessage id="hello" values={{name: user.name}}/>*/}
                                {/*</div>*/}
                            </div>

                        </>
                    ) : (
                        <AuthLinks/>
                    ) }

                    <div id="scene">
                            <div className="item-1" data-depth="0.1">
                                <img src={icon1} alt="logo" className=""/>
                            </div>
                            <div className="item-2" data-depth="0.8">
                                <img src={icon2} alt="logo" />
                            </div>
                            <div className="item-3" data-depth="0.1">
                                <img src={icon3} alt="logo" />
                            </div>
                    </div>


                </div>

                <div className="home-page__goods">
                    <GoodsContainer goodsContainerTitle="All goods" goods={this.store.goods}/>
                    <Pagination
                        currentPage={this.currentPage}
                        nextPage={this.nextPage}
                        numberOfPages={this.numberOfPages}
                        previousPage={this.previousPage}
                        setPage={this.setPage}
                    />
                </div>
            </>
        )
    }
}

export default HomePage;
