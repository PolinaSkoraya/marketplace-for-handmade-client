import {action, computed, observable} from 'mobx';
import {
    deleteGoodFromBasket,
    deleteGoodFromLikedGoods,
    getGoodWithSellerById,
    postGoodIntoBasket, postGoodIntoLikedGoods, updateGood, updateLikes
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

    @observable goodName = "";
    @observable description = "";
    @observable price = 0;

    @action
    initUpdatingGood (good) {
        this.goodName = good.name;
        this.description = good.description;
        this.price = good.price;
    }

    @action.bound
    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this[name] = value;
    }

    @action.bound
    async update(id) {
        try {
            const newGood = {
                name: this.goodName,
                description: this.description,
                price: this.price
            }
            const responseGood = await updateGood(id, newGood);
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
    async addToLikedGoods() {
        try {
            this.good.likes = this.good.likes + 1;
            await updateLikes(this.good._id, this.good.likes);

            await postGoodIntoLikedGoods(user.id, this.good._id);
            await user.initLikedGoods();

            await user.getGoods(); //for updating likes in basket
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

            await user.getGoods();  //for updating likes in basket
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