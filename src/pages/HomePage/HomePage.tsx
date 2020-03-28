import React, {Component} from 'react';
import style from './style.module.scss';
import GoodsStore from "../../stores/GoodsStore";
import {observer} from "mobx-react";
import AuthLinks from "../../components/AuthLinks/AuthLinks";
import RootStore from "../../stores/RootStore";
import {NavLink} from 'react-router-dom';
import {action, observable} from "mobx";
import Good from "../../components/Good/Good";
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

        return (
            <>
                <div className={style.header}>
                    { !user.authenticated && <AuthLinks/> }
                </div>

                <div className={style.wrapper}>
                    <div className={style.wrapper__title}>Top 3 of marketplace</div>
                        <ul className={style.stage}>
                            {
                                this.store.goods[0] &&
                                this.store.goods.slice(0, 3).map( good =>
                                    <li className={style.scene} key={good._id}>
                                        <div className={style.movie} onClick={ () => { return true } }>
                                            <div className={style.poster}>
                                                <div className={style.poster__inner}>
                                                    <Good
                                                        key={0}
                                                        good={good}
                                                        idSeller={good.idSeller}
                                                        shadow={false}
                                                    />
                                                </div>
                                            </div>

                                            <div className={style.info}>
                                                <NavLink
                                                    to={ROUTES.goods.goods+ good._id}
                                                >
                                                    <div className={style.info__inner}>
                                                        <p className={style.info__name}>{good.name}</p>
                                                        <p>{good.description}</p>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                </div>
            </>
        )
    }
}

export default HomePage;
