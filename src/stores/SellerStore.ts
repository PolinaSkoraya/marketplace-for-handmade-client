import {action, observable} from 'mobx';
import {getGoodsOfSeller, getSellerById, postGood} from "../http/services";
import {GoodInterface} from "./helpers/interfaces";
import RootStore from "./RootStore";

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

    constructor () {
        const {user} = RootStore;

        this.initSeller(user.id);
        this.initGoodsOfSeller(user.id);

        console.log(this.seller);
    }


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

    @observable name;
    @observable price;
    @observable description;


    @action.bound
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this[name] = value;
    }

    @action.bound
    async createGood() {
        console.log(this.seller);
        const good = {
            name: this.name,
            price: this.price,
            idSeller: this.seller._id,
            description: this.description,
            image: "fairy-house.jpg",
            likes: 0
        }

        try {
            const response = await postGood(good);

            console.log(response);
            
        } catch (error) {
            console.log(error);
        }
    }

    @action
    getSellerRole(){

    }
}

export {SellerStore};