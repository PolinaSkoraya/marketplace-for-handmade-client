import {action, observable} from 'mobx';
import {getAllGoods, getGoodsByName, getPageGoods} from "../http/services";
import {GoodInterface} from "./helpers/interfaces";

class GoodsStore {
    @observable goods: GoodInterface[] = [];
    @observable currentPage = 1;
    @observable numberOfPages = 0;
    @observable searchName = "";
    @observable showReset = false;

    @action.bound
    async loadGoods (page) {
        try {
            console.log("loadGoods", page);
            const responseGoods = await getPageGoods(page);
            this.goods = responseGoods.data.docs;
            this.sortByLikes();

            return responseGoods.data.totalPages;
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
    async searchByName (name) {
        this.showReset = true;
        let allGoods: GoodInterface[];
        let regexp = new RegExp(`${name.value}`);
        try {
            // let response = await getAllGoods();
            // allGoods = response.data;
            // this.goods = allGoods.filter( good => good.name.toLowerCase().search(regexp) >= 0);

            this.searchName = name.value;
            const responseGoods = await getGoodsByName(name.value, this.currentPage);
            this.goods = responseGoods.data.docs;
            this.numberOfPages = responseGoods.data.totalPages;

            console.log(responseGoods);
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async searchByCategory (category) {
        this.showReset = true;
        let allGoods: GoodInterface[];
        try {
            let response = await getAllGoods();
            allGoods = response.data;
            // @ts-ignore
            this.goods = allGoods.filter(good => (good.category) && (good.category.toUpperCase() === category));
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async previousPage () {
        this.currentPage = this.currentPage - 1;
        if (this.searchName) {

            const responseGoods = await getGoodsByName(this.searchName, this.currentPage);
            this.goods = responseGoods.data.docs;
            this.numberOfPages = responseGoods.data.totalPages;

        } else {
            await this.loadGoods(this.currentPage);
        }
    }

    @action.bound
    async nextPage () {
        this.currentPage = this.currentPage + 1;
        if (this.searchName) {

            const responseGoods = await getGoodsByName(this.searchName, this.currentPage);
            this.goods = responseGoods.data.docs;
            this.numberOfPages = responseGoods.data.totalPages;

        } else {
            await this.loadGoods(this.currentPage);
        }
    }

    @action.bound
    async setPage (page) {
        this.currentPage = page;
        if (this.searchName) {

            const responseGoods = await getGoodsByName(this.searchName, this.currentPage);
            this.goods = responseGoods.data.docs;
            this.numberOfPages = responseGoods.data.totalPages;

        } else {
            await this.loadGoods(this.currentPage);
        }
    }

    @action
    async resetGoods (page) {
        this.showReset = false;
        this.searchName = "";
        this.numberOfPages = await this.loadGoods(page);
    }
}

export default GoodsStore;
