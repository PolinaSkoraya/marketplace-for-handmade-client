import {action, computed, observable} from 'mobx';
import {
    deleteGoodFromBasket,
    deleteGoodFromLikedGoods,
    getGoodWithSellerById,
    postGoodIntoBasket, postGoodIntoLikedGoods, updateLikes
} from "../http/services";
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
            await user.initBasket();

        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async removeFromBasket() {
        try {
            const response = await deleteGoodFromBasket(user.id, this.good._id);
            user.basket = response.data.basket;
            user.goodsInBasket = user.goodsInBasket.filter(good => good._id !== this.good._id);

        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async addToLikedGoods() {
        try {
            await postGoodIntoLikedGoods(user.id, this.good._id);
            await user.initLikedGoods();

            this.good.likes = this.good.likes + 1;
            await updateLikes(this.good._id, this.good.likes);

        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async removeFromLikedGoods() {
        try {
            const response = await deleteGoodFromLikedGoods(user.id, this.good._id);
            user.likedGoods = response.data.likedGoods;
            user.goodsInLikedGoods = user.goodsInLikedGoods.filter(good => good._id !== this.good._id);

            this.good.likes = this.good.likes - 1;
            await updateLikes(this.good._id, this.good.likes);

        } catch (error) {
            console.log(error);
        }
    }

    @computed
    get isInBasket() {
        return (user.basket.filter(idGood => idGood === this.good._id).length > 0);
    }

    @computed
    get isLiked() {
        return (user.likedGoods.filter(idGood => idGood === this.good._id).length > 0);
    }

}

export default OneGoodStore;