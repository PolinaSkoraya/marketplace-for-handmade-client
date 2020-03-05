import {action, observable} from 'mobx';
import {getGoodsOfSeller, getSellerById} from "../http/services";
import {GoodInterface} from "./helpers/interfaces";

class SellerStore {
    @observable seller = {
        _id: "",
        description: "",
        name: "",
        services: [],
        logo: "",
        idUser: ""
    };

    @observable goodsOfSeller: GoodInterface[] = [];

    @action.bound
    async initSeller (id) {
        try {
            const responseSeller = await getSellerById(id);
            this.seller = responseSeller.data;

        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async initGoodsOfSeller (id) {
        try {
            const responseGoodsOfSeller = await getGoodsOfSeller(id);
            this.goodsOfSeller = responseGoodsOfSeller.data;

        } catch (error) {
            console.log(error);
        }
    }
}

export {SellerStore};