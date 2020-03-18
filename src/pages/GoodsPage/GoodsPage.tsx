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
import {CSSTransition} from "react-transition-group";

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
        this.store.searchByName(this.searchName);
    }

    @action
    resetGoods (page) {
        this.searchName = "";
        this.store.loadGoods(page);
    }

    render(){
        const {user} = RootStore;

        const iconStyle = {fontSize: "20px"};
        const labelStyle = {height: "30px", width: "30px"};

        return (
            <>
                <div className="goods-page">
                    <div className="goods-page__search">
                        {
                            this.searchName && (
                                <>
                                    <button id="button-cancel-search" onClick={() => this.resetGoods(this.currentPage)}>cancel</button>
                                    <SmallButton labelStyle={labelStyle} style={{...iconStyle}} htmlFor="button-cancel-search" icon={<MdCancel/>}/>
                                </>

                            )
                        }
                        <input
                            type="text"
                            name="searchName"
                            placeholder="Search..."
                            onChange={this.handleInputChange}
                            className="input input-search"
                            value={this.searchName}
                        />

                        <button  id="button-search" onClick={()=>this.store.searchByName(this.searchName)}>search</button>
                        <SmallButton labelStyle={labelStyle} style={iconStyle} htmlFor="button-search" icon={<FiSearch/>}/>
                    </div>

                    {/*<CSSTransition*/}
                    {/*    in={true}*/}
                    {/*    appear={true}*/}
                    {/*    exit={true}*/}
                    {/*    timeout={3000}*/}
                    {/*    classNames="fade"*/}
                    {/*>*/}
                        <GoodsContainer goodsContainerTitle="All Goods" goods={this.store.goods}/>
                    {/*</CSSTransition>*/}

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

export {GoodsPage};
