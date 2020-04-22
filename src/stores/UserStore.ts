import { action, computed, observable } from "mobx";
import { instance } from "../http/instance";
import { URLS } from "../http/urls";
import {
  deleteGoodFromBasket,
  deleteOrders,
  getUserById,
  getGoodsInBasket,
  getGoodsOfSeller,
  getLikedGoods,
  getSellerOrders,
  getShopByUserId,
  getUserOrders,
  postGood,
  postOrder,
  postShop,
  updateOrderState,
  updateUserRole,
} from "../http/services";
import jwtDecode from "jwt-decode";
import {IGood, ISeller} from "./helpers/interfaces";
import { Roles } from "./helpers/roles";

const TOKEN = "token";

class Seller {
  @observable id: string;
  @observable description: string;
  @observable name: string;
  @observable services: string[];
  @observable logo: string;
  @observable idUser: string;

  constructor(data: ISeller) {
    this.id = data._id;
    this.description = data.description;
    this.name = data.name;
    this.services = data.services;
    this.logo = data.logo;
    this.idUser = data.idUser;
  }
}

class UserStore {
  @observable id;
  @observable name = "";
  @observable nameForRegistration = "";
  @observable email = "";
  @observable password = "";
  @observable roles: Roles[] = [];
  @observable basket = [];
  @observable likes = [];
  @observable orders: IGood[] = [];

  @observable goodsInBasket: IGood[] = [];
  @observable goodsInLikedGoods: IGood[] = [];

  @observable showMessageError = false;
  @observable isError = false;

  errors = {
    notCreated: [],
  };

  // @observable seller = {
  //   id: "",
  //   description: "",
  //   name: "",
  //   services: [],
  //   logo: "",
  // };
  @observable seller: Seller | null | undefined;
  //@observable seller: Seller = new Seller( {_id: "12", description: "aw", name: "dw", services: ["aw"], logo: "dw", idUser: ""});
  @observable goodsOfSeller: IGood[] = [];
  @observable ordersOfSeller: IGood[] = [];

  constructor() {
    const accessToken = this.getAuthTokens();

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

    await Promise.all([
      this.initBasket(),
      this.initLikedGoods(),
      this.getOrders(this.id)
    ]);

    if (this.roles.includes(Roles.seller)) {
      await this.initSeller(this.id);
      // @ts-ignore
      await this.initGoodsOfSeller(this.seller.id);
    }
  }

  getAuthTokens = () => {
    return localStorage.getItem(TOKEN);
  };

  @computed
  get authenticated() {
    return Boolean(this.name);
  }

  @action.bound
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this[name] = value;
    console.log(this[name]);
  }

  @action.bound
  async login(email, password) {
    const user = {
      email: email,
      password: password,
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
  async register(name, email, password) {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    try {
      await instance.post(URLS.registerBuyer, user);

      this.login(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  @action.bound
  async initBasket() {
    let responseBuyer = await getUserById(this.id);
    this.basket = responseBuyer.data.basket;

    this.getGoods(); //get goods after getting the basket
  }

  @action.bound
  async removeFromBasket(idGood) {
    try {
      let response = await deleteGoodFromBasket(this.id, idGood);

      this.basket = response.data.basket;
      this.goodsInBasket = this.goodsInBasket.filter(
        (good) => good._id !== idGood
      );
    } catch (error) {
      console.log(error);
    }
  }

  @action.bound
  async initLikedGoods() {
    let responseBuyer = await getUserById(this.id);
    this.likes = responseBuyer.data.likedGoods;
    this.setLikedGoods();
  }

  @action.bound
  async logOutUser() {
    localStorage.removeItem(TOKEN);

    this.basket = [];
    this.name = "";
    this.ordersOfSeller = [];
    this.seller = null;
  }

  @action.bound
  async getGoods() {
    try {
      const responseGoods = await getGoodsInBasket(this.id);
      this.goodsInBasket = responseGoods.data;
    } catch (error) {
      console.log(error);
    }
  }

  @action.bound
  async setLikedGoods() {
    try {
      const responseGoods = await getLikedGoods(this.id);
      this.goodsInLikedGoods = responseGoods.data;
    } catch (error) {
      console.log(error);
    }
  }

  @computed
  get basketCost() {
    let cost = 0;
    this.goodsInBasket.forEach((good) => {
      cost += good.price;
    });
    return cost;
  }

  @action.bound
  async setSellerRole() {
    console.log(this.email);
    console.log(this.password);
    await updateUserRole(this.id, Roles.seller);
    await this.login(this.email, this.password); //await
    this.roles.push(Roles.seller);
    await this.createShop();
  }
  @observable newShopName = "";
  @observable newShopDescription = "";

  @action.bound
  async createShop() {
    const seller = {
      name: this.newShopName,
      idUser: this.id,
      description: this.newShopDescription,
      logo: "clayshop-logo.svg",
      services: ["master"],
    };

    try {
      await postShop(seller);
    } catch (error) {
      console.log(error);
    }
  }

  @action.bound
  async initSeller(id) {
    try {
      const response = await getShopByUserId(id);
      // this.seller = responseSeller.data;
      this.seller = new Seller (response.data);

      const responseSellerOrders = await getSellerOrders(this.seller.id); //new function, for accept orders
      this.ordersOfSeller = responseSellerOrders.data;

    } catch (error) {
      console.log(error);
    }
  }

  @action.bound
  async initGoodsOfSeller(id) {
    try {
      const responseGoodsOfSeller = await getGoodsOfSeller(id);
      this.goodsOfSeller = responseGoodsOfSeller.data;
    } catch (error) {
      console.log(error);
    }
  }

  @action
  async getOrders(id) {
    try {
      let response = await getUserOrders(id);
      this.orders = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  @action
  async addOrder(idUser, idGood, idSeller) {
    try {
      await postOrder(idUser, idGood, idSeller);
      await this.removeFromBasket(idGood);
      await this.getOrders(this.id);

    } catch (error) {
      console.log(error);
    }
  }

  @action
  async acceptOrder(idOrder) {
    await updateOrderState(idOrder);
    await this.getOrders(this.id);
    const responseSellerOrders = await getSellerOrders(this.seller?.id);
    this.ordersOfSeller = responseSellerOrders.data;
  }

  @action.bound
  async createGood(values) {
    const good = {
      name: values.newGoodName,
      price: values.newGoodPrice,
      idSeller: this.seller?.id,
      description: values.newGoodDescription,
      image: values.photos[0],
      photos: values.photos,
      likes: 0,
      category: values.newGoodCategory,
      tags: ["tag1", "tag2"],
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
  async deleteOrder(idOrder) {
    let response = await deleteOrders(idOrder);
    this.orders = this.orders.filter(
      (order) => order.idOrder !== response.data._id
    );
    this.ordersOfSeller = this.ordersOfSeller.filter(
      (order) => order.idOrder !== response.data._id
    );
  }
}

export { UserStore, TOKEN };
