import {action, computed, observable} from 'mobx';
import {deleteGoodFromBasket, getGoodWithSellerById, postGoodIntoBasket} from "../http/services";
import RootStore from "./RootStore";

const {user} = RootStore;

class OneGoodStore {
    @observable good = {
        _id: "",
        name: "",
        price: 0,
        idCategory: "",
        idSeller: "",
        description: "",
        likes: 0,
        image: "",
        seller: {
            _id: "",
            services: "",
            name: "",
            description: "",
            logo: ""
        }
    };

    @action.bound
    async initGood (id) {
        try {
            const responseGood = await getGoodWithSellerById(id);
            this.good = responseGood.data;

        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async addToBasket() {
        try {
            await postGoodIntoBasket(user.id, this.good._id);

            // @ts-ignore
            // user.basket = user.basket.push(this.good._id);
            // console.log(user.basket);

            await user.initBasket();

        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async removeFromBasket() {
        try {
            await deleteGoodFromBasket(user.id, this.good._id);

            user.basket = user.basket.filter(idGood => idGood !== this.good._id);
            user.goodsInBasket = user.goodsInBasket.filter(good => good._id !== this.good._id);

        } catch (error) {
            console.log(error);
        }
    }

    @computed
    get isInBasket() {
        return (user.basket.filter(idGood => idGood == this.good._id).length > 0);
    }

}

export default OneGoodStore;