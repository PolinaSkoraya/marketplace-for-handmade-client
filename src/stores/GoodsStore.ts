import {action, observable} from 'mobx';
import {getAllGoods} from "../http/services";
import {GoodInterface} from "./helpers/interfaces";

class GoodsStore {
    @observable goods: GoodInterface[] = [];

    @action.bound
    async loadGoods () {
        try {
            const responseGoods = await getAllGoods();
            this.goods = responseGoods.data;
            this.sortByLikes();
            // if (numberOfGoods) {
            //     this.setFixedNumberOfGoods(numberOfGoods);
            // }
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

    // @action.bound
    // setFixedNumberOfGoods (num) {
    //     this.goods = this.goods.slice(0, num);
    // }

}

export default GoodsStore;
