import {action, observable} from 'mobx';
import {getAllGoods, getPageGoods} from "../http/services";
import {GoodInterface, goodsCategories} from "./helpers/interfaces";

class StatisticsStore {


    @observable sumsByCategory = {
        "ART" : 0,
        "TOYS" : 0,
        "HOMEWARE" : 0,
        "ACCESSORIES" : 0
    };


}

export default new StatisticsStore();