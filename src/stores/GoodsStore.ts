import {action, observable} from 'mobx';
import {getAllGoods, getPageGoods} from "../http/services";
import {GoodInterface} from "./helpers/interfaces";

class GoodsStore {
    @observable goods: GoodInterface[] = [];
    //@observable numberOfPages: number = 0;

    @action.bound
    async loadGoods (page) {
        try {
            const responseGoods = await getPageGoods(page);
            this.goods = responseGoods.data.docs;
            // this.numberOfPages = responseGoods.data.totalPages;
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
        console.log(name);
        let allGoods: GoodInterface[];
        try {
            let response = await getAllGoods();
            allGoods = response.data;
            this.goods = allGoods.filter(good => good.name.toLowerCase() === name.toLowerCase());
        } catch (error) {
            console.log(error);
        }
    }

}

export default GoodsStore;
