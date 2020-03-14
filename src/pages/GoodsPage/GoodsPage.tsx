import "./GoodsPage.scss"
import React, {Component} from "react";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import GoodsStore from "../../stores/GoodsStore";
import RootStore from "../../stores/RootStore";
import {ROUTES} from "../../routes/routes";
import {Redirect} from 'react-router-dom'
import {action, observable} from "mobx";
import Pagination from "../../components/Pagination/Pagination";
import SmallButton from "../../components/SmallButton/SmallButton";

import {FiSearch} from "react-icons/fi";
import {MdCancel} from "react-icons/md";

@observer
class GoodsPage extends Component{
    store: GoodsStore = new GoodsStore();
    @observable currentPage = 1;
    @observable numberOfPages = 0;
    @observable searchName = "";

    async componentDidMount () {
        const response = await this.store.loadGoods(this.currentPage);
        this.numberOfPages = response;
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

    @action.bound
    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this[name] = value;
    }

    render(){
        const {user} = RootStore;

        const iconStyle = {fontSize: "16px"};
        const labelStyle = {height: "25px", width: "25px"};

        return (
            <>
                {/*{ user.authenticated ? (*/}
                    <div className="goods-page">
                        <div className="goods-page__search">
                            <button id="button-cancel-search" onClick={() => this.store.loadGoods(this.currentPage)}>cancel</button>
                            <SmallButton labelStyle={labelStyle} style={{...iconStyle}} htmlFor="button-cancel-search" icon={<MdCancel/>}/>

                            <input
                                type="text"
                                name="searchName"
                                placeholder="Search..."
                                onChange={this.handleInputChange}
                            />

                            <div className="goods-page__search-button">
                                <button  id="button-search" onClick={()=>this.store.searchByName(this.searchName)}>search</button>
                                <SmallButton labelStyle={labelStyle} style={iconStyle} htmlFor="button-search" icon={<FiSearch/>} />
                            </div>
                        </div>

                        <GoodsContainer goodsContainerTitle="All Goods" goods={this.store.goods}/>

                        <Pagination
                            currentPage={this.currentPage}
                            nextPage={this.nextPage}
                            numberOfPages={this.numberOfPages}
                            previousPage={this.previousPage}
                            setPage={this.setPage}
                        />
                    </div>
                {/*) : (*/}
                {/*    <Redirect to={ROUTES.users.login}/>*/}
                {/*) }*/}
            </>
        )
    }
}

export {GoodsPage};
