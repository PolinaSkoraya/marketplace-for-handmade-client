import React, {Component} from 'react';
import './HomePage.scss';
import GoodsStore from "../../stores/GoodsStore";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import AuthLinks from "../../components/AuthLinks/AuthLinks";
import RootStore from "../../stores/RootStore";
import {NavLink} from 'react-router-dom';
import icon1 from "../../static/icons/svg/026-handmade.svg";
import icon2 from "../../static/icons/svg/010-ball-of-wool.svg";
import icon3 from "../../static/icons/svg/014-button-1.svg";
import {action, observable} from "mobx";
import Pagination from "../../components/Pagination/Pagination";
import Good from "../../components/Good/Good";
import {STATIC_IMAGES} from "../../http/urls";
import {ROUTES} from "../../routes/routes";


@observer
class HomePage extends Component{
    store: GoodsStore = new GoodsStore();
    @observable currentPage = 1;
    @observable numberOfPages = 0;

    async componentDidMount () {
        this.numberOfPages = await this.store.loadGoods(this.currentPage);
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
                </div>


                <div className="wrapper">
                    <div className="wrapper__title">Top 3 of marketplace</div>
                        <ul className="stage">
                            {
                                this.store.goods[0]?
                                this.store.goods.slice(0, 3).map(good =>
                                    <li className="scene">
                                        <div className="movie" onClick={ () => { return true } }>
                                            <div className="poster">
                                                <div className="poster__inner">
                                                    <Good
                                                        key={0}
                                                        good={good}
                                                        idSeller={good.idSeller}
                                                        shadow={false}
                                                    />
                                                </div>
                                            </div>

                                            <div className="info">
                                                <NavLink
                                                    className="good__link-image"
                                                    to={ROUTES.goods.goods+ good._id}
                                                >
                                                    <div className="info__inner">
                                                        <p className="info__name">{good.name}</p>
                                                        {/*<img className="info__img" src={STATIC_IMAGES + good.image } alt="image"/>*/}
                                                        <p>{good.description}</p>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </li>
                                )
                                :
                                <></>
                            }
                        </ul>
                </div>

                {/*<div className="home-page__goods">*/}
                {/*    <GoodsContainer goodsContainerTitle="All goods" goods={this.store.goods}/>*/}
                {/*    <Pagination*/}
                {/*        currentPage={this.currentPage}*/}
                {/*        nextPage={this.nextPage}*/}
                {/*        numberOfPages={this.numberOfPages}*/}
                {/*        previousPage={this.previousPage}*/}
                {/*        setPage={this.setPage}*/}
                {/*    />*/}
                {/*</div>*/}
            </>
        )
    }
}

export default HomePage;
