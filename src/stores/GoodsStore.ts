import {action, observable} from 'mobx';
import {getAllGoods, getGoodsByName, getGoodsWithQuery, getPageGoods} from "../http/services";
import {GoodInterface} from "./helpers/interfaces";
import {createObservableArray} from "mobx/lib/types/observablearray";

class GoodsStore {
    @observable goods: GoodInterface[] = [];
    @observable currentPage = 1;
    @observable numberOfPages = 0;
    @observable searchName = "";
    @observable showReset = false;
    @observable searchCategory = "";

    @action.bound
    async loadGoods (page) {
        try {
            const responseGoods = await getPageGoods(page);
            this.goods = responseGoods.data.docs;
            this.numberOfPages = responseGoods.data.totalPages;
            this.sortByLikes();
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    sortByLikes() {
        this.goods = this.goods
            .slice()
            .sort((a, b) => a.likes > b.likes ? -1 : 1);
    }

    @action.bound
    async search () {
        this.showReset = true;
        const config = {
            page: this.currentPage,
            category: this.searchCategory,
            name: this.searchName
        };
        try {
            const response = await getGoodsWithQuery(config);
            this.goods = response.data.docs;
            this.numberOfPages = response.data.totalPages;
            this.sortByLikes();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async searchByName (name) {
        this.currentPage = 1;
        this.searchName = name.value;
        this.search();
    }

    @action.bound
    async searchByCategory (category) {
        this.currentPage = 1;
        this.searchCategory = category;
        this.search();
    }

    @action.bound
    async previousPage () {
        this.currentPage = this.currentPage - 1;
        this.search();
    }

    @action.bound
    async nextPage () {
        this.currentPage = this.currentPage + 1;
        this.search();
    }

    @action.bound
    async setPage (page) {
        this.currentPage = page;
        this.search();
    }

    @action
    async resetGoods () {
        this.searchName = "";
        this.searchCategory = "";
        this.currentPage = 1;
        this.search();
        this.showReset = false;
    }
}

export default GoodsStore;
