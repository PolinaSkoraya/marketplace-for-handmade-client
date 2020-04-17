import style from "./style.module.scss"
import React, {Component} from "react";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import {observer} from "mobx-react";
import GoodsStore from "../../stores/GoodsStore";
import RootStore from "../../stores/RootStore";
import {action, observable} from "mobx";
import Pagination from "../../components/Pagination/Pagination";
import { IconContext } from "react-icons";
import {FiSearch} from "react-icons/fi";
import {MdCancel} from "react-icons/md";
import {goodsCategories} from "../../stores/helpers/interfaces";
import Button from "../../components/Button/Button";
import classNames from "classnames";

@observer
class GoodsPage extends Component {
    store: GoodsStore = new GoodsStore();
    @observable currentPage = 1;
    @observable numberOfPages = 0;
    @observable searchName = "";
    @observable searchCategory = "choose";
    @observable defaultSelect = "choose";

    async componentDidMount () {
        this.numberOfPages = await this.store.loadGoods(this.currentPage);
    }

    @action.bound
    async previousPage () {
        this.currentPage = this.currentPage - 1;
        await this.store.loadGoods(this.currentPage);
    }

    @action.bound
    async nextPage () {
        this.currentPage = this.currentPage + 1;
        await this.store.loadGoods(this.currentPage);
    }

    @action.bound
    async setPage (page) {
        this.currentPage = page;
        await this.store.loadGoods(this.currentPage);
    }

    @action.bound
    async handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this[name] = value;
        if (name === "searchName") {
            await this.store.searchByName(this.searchName);
            this.searchCategory = this.defaultSelect;
        }
        if (name === "searchCategory") {
            await this.store.searchByCategory(this.searchCategory);
            this.searchName = "";
        }
    }

    @action
    async resetGoods (page) {
        this.searchName = "";
        this.searchCategory = this.defaultSelect;
        await this.store.loadGoods(page);
    }

    render () {
        return (
            <>
                <div className={style.goodsPage}>
                    <div className={style.goodsPage__search}>
                        <div className={style.search}>
                            {
                                (this.searchName || this.searchCategory !== this.defaultSelect) && (
                                    <>
                                        <Button
                                            styleType="small"
                                            className={style.buttonCancel}
                                            onClick={() => this.resetGoods(this.currentPage)}
                                        >
                                            <MdCancel/>
                                        </Button>
                                    </>
                                )
                            }
                            <IconContext.Provider value={{className: style.searchIcon}}>
                                    <FiSearch/>
                            </IconContext.Provider>

                            <input
                                type="text"
                                name="searchName"
                                placeholder="Search..."
                                onChange={this.handleInputChange}
                                className={classNames("input", style.inputSearch)}
                                value={this.searchName}
                            >
                            </input>
                        </div>

                        <select
                            className="input"
                            name="searchCategory"
                            onChange={this.handleInputChange}
                            value = {this.searchCategory}
                        >
                            <option value={this.defaultSelect} disabled>Choose category</option>
                            <option value={goodsCategories.art}>art</option>
                            <option value={goodsCategories.accessories}>accessories</option>
                            <option value={goodsCategories.homeware}>homeware</option>
                            <option value={goodsCategories.toys}>toys</option>
                        </select>
                    </div>

                    <GoodsContainer goods={this.store.goods}/>

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

export default GoodsPage;
