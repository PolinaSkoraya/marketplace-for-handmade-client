import {action, computed, observable} from 'mobx';
import {instance} from '../http/instance';
import {URLS} from '../http/urls';
import {
    deleteGoodFromBasket,
    getBuyerById,
    getGoodsInBasket,
    getGoodsOfSeller,
    getLikedGoods, getSellerOrders,
    getShopByUserId,
    getUserOrders,
    postGood,
    postOrder,
    updateUserRole
} from "../http/services";
import jwtDecode from 'jwt-decode';
import {GoodInterface} from "./helpers/interfaces";
import {Roles} from "./helpers/roles";

const TOKEN = 'token';

class UserStore {
    @observable id: string | undefined;
    @observable name = "";
    @observable nameForRegistration = "";
    @observable email = "";
    @observable password = "";
    @observable roles: Roles[] = [];
    @observable basket = [];
    @observable likedGoods = [];
    @observable orders = [];

    @observable goodsInBasket: GoodInterface[] = [];
    @observable goodsInLikedGoods: GoodInterface[] = [];

    @observable seller = {
        _id: "",
        description: "",
        name: "",
        services: [],
        logo: ""
    };
    @observable goodsOfSeller: GoodInterface[] = [];
    @observable ordersOfSeller: GoodInterface[] = [];

    constructor() {
        const accessToken  = this.getAuthTokens();

        if (accessToken) {
            this.init(accessToken);
        }
    }

    @action
    async init(token: string) {
        const authData = jwtDecode(token);

        this.id = authData.id;
        this.name = authData.name;
        this.roles = authData.roles;
        console.log(authData.roles);

        await this.initBasket();
        await this.initLikedGoods();
        await this.getOrders(this.id);

        if (this.roles.includes(Roles.seller)) {
            await this.initSeller(this.id);
            await this.initGoodsOfSeller(this.seller._id);
        }
    }

    getAuthTokens = () => {
        return localStorage.getItem(TOKEN);
    };

    @computed
    get authenticated () {
        return Boolean(this.name);
    }

    @action.bound
    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this[name] = value;
    }

    @action.bound
    async login () {
        const user = {
            email: this.email,
            password: this.password
        };

        try {
            const response = await instance.post(URLS.loginBuyer, user);
            localStorage.setItem(TOKEN, response.data);

            this.init(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async register () {
        const user = {
            name: this.nameForRegistration,
            email: this.email,
            password: this.password
        };
        try {
            const response = await instance.post(URLS.registerBuyer, user);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async initBasket () {
        let responseBuyer = await getBuyerById(this.id);
        this.basket = responseBuyer.data.basket;

        this.getGoods(); //get goods after getting the basket
    }

    @action.bound
    async removeFromBasket (idGood) {
        try {
            let response = await deleteGoodFromBasket(this.id, idGood);

            this.basket = response.data.basket;
            this.goodsInBasket = this.goodsInBasket.filter(good => good._id !== idGood);
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async initLikedGoods () {
        let responseBuyer = await getBuyerById(this.id);
        this.likedGoods = responseBuyer.data.likedGoods;
        this.setLikedGoods();
    }

    @action.bound
    async logOutBuyer () {
        localStorage.removeItem(TOKEN);

        this.basket = [];
        this.name = '';
    }

    @action.bound
    async getGoods () {
        try {
            const responseGoods = await getGoodsInBasket(this.id);
            this.goodsInBasket = responseGoods.data;
        } catch (error) {
            console.log(error);

        }
    }

    @action.bound
    async setLikedGoods () {
        try {
            const responseGoods = await getLikedGoods(this.id);
            this.goodsInLikedGoods = responseGoods.data;
        } catch (error) {
            console.log(error);
        }
    }

    @computed
    get basketCost () {
        let cost = 0;
        this.goodsInBasket.forEach(good => {
            cost += good.price;
        })
        return cost;
    }

    @action.bound
    async setSellerRole () {
        const response = await updateUserRole(this.id, Roles.seller);
        console.log(response);
        this.login();
        this.roles.push(Roles.seller);
    }

    @action.bound
    async initSeller (id) {
        try {
            const responseSeller = await getShopByUserId(id);
            this.seller = responseSeller.data;
            const responseSellerOrders = await getSellerOrders(this.seller._id);
            this.ordersOfSeller = responseSellerOrders.data;
            console.log(this.ordersOfSeller);
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

    @action
    async getOrders (id) {
        try {
            let response = await getUserOrders(id);
            this.orders = response.data;
        } catch (error) {
            console.log(error);
        }
    }

    @action
    async addOrder (idUser, idGood, idSeller) {
        try {
            let response = await postOrder(idUser, idGood, idSeller);
            await this.removeFromBasket(idGood);
            await this.getOrders(this.id);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    @observable goodName;
    @observable price;
    @observable description;

    @action.bound
    async createGood () {
        const good = {
            name: this.goodName,
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
}

export {
    UserStore, TOKEN
};
