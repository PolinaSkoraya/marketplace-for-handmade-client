import {action, computed, observable} from 'mobx';
import {instance} from '../http/instance';
import {URLS} from '../http/urls';
import {
    deleteGoodFromBasket, deleteOrders,
    getUserById,
    getGoodsInBasket,
    getGoodsOfSeller,
    getLikedGoods, getSellerOrders,
    getShopByUserId,
    getUserOrders,
    postGood,
    postOrder, postShop, updateOrderState,
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
    @observable orders: GoodInterface[] = [];

    @observable goodsInBasket: GoodInterface[] = [];
    @observable goodsInLikedGoods: GoodInterface[] = [];

    @observable showMessageError = false;
    @observable isError = false;

    errors = {
      notCreated: []
    };

    @observable seller = {
        _id: "",
        description: "",
        name: "",
        services: [],
        logo: ""
    };
    @observable goodsOfSeller: GoodInterface[] = [];
    @observable ordersOfSeller: GoodInterface[] = [];

    constructor () {
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

        await this.initBasket();         //
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
    async login (email, password) {
        const user = {
            email: email,
            password: password
        };

        try {
            this.showMessageError = false;
            const response = await instance.post(URLS.loginBuyer, user);
            localStorage.setItem(TOKEN, response.data);
            this.init(response.data);
            return response.data;
        } catch (error) {
            this.showMessageError = true;
            console.log(error);
        }
    }

    @action.bound
    async register (name, email, password) {
        const user = {
            name: name,
            email: email,
            password: password
        };
        try {
            const response = await instance.post(URLS.registerBuyer, user);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        this.login(email, password);
    }

    @action.bound
    async initBasket () {
        let responseBuyer = await getUserById(this.id);
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
        let responseBuyer = await getUserById(this.id);
        this.likedGoods = responseBuyer.data.likedGoods;
        this.setLikedGoods();
    }

    @action.bound
    async logOutUser () {
        localStorage.removeItem(TOKEN);

        this.basket = [];
        this.name = '';
        this.ordersOfSeller = [];
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
        });
        return cost;
    }

    @action.bound
    async setSellerRole () {
        await updateUserRole(this.id, Roles.seller);
        await this.login(this.email, this.password);  //await
        this.roles.push(Roles.seller);
        await this.createShop();
    }
    @observable newShopName = "";
    @observable newShopDescription = "";

    @action.bound
    async createShop () {
        const seller = {
            name: this.newShopName,
            idUser: this.id,
            description: this.newShopDescription,
            logo: "clayshop-logo.svg",
            services: "master"
        };

        try {
            const response = await postShop(seller);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async initSeller (id) {
        try {
            const responseSeller = await getShopByUserId(id);
            this.seller = responseSeller.data;
            const responseSellerOrders = await getSellerOrders(this.seller._id); //new function, for accept orders
            this.ordersOfSeller = responseSellerOrders.data;
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

            console.log(this.orders);
        } catch (error) {
            console.log(error);
        }
    }

    @action
    async acceptOrder(idOrder) {
        let response = await updateOrderState(idOrder);
        console.log(response.data);
        await this.getOrders(this.id);
        const responseSellerOrders = await getSellerOrders(this.seller._id);
        this.ordersOfSeller = responseSellerOrders.data;
    }

    @action.bound
    async createGood (values) {
        const good = {
            name: values.newGoodName,
            price: values.newGoodPrice,
            idSeller: this.seller._id,
            description: values.newGoodDescription,
            image: values.image,
            photos: values.photos,
            likes: 0,
            category: values.newGoodCategory,
            tags: ["tag1", "tag2"]
        };

        try {
            await postGood(good);

        } catch (error) {
            // @ts-ignore
            this.errors.notCreated.push(error);
            console.log(error);
        }
    }

    @action
    async deleteOrder (idOrder) {
        let response = await deleteOrders(idOrder);
        this.orders = this.orders.filter(order => order.idOrder !== response.data._id);
        this.ordersOfSeller = this.ordersOfSeller.filter(order => order.idOrder !== response.data._id);
    }
}

export {
    UserStore, TOKEN
};
