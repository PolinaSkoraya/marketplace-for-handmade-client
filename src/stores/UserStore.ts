import {action, computed, observable} from 'mobx';
import {instance} from '../http/instance';
import {URLS} from '../http/urls';
import {getBuyerById} from "../http/services";
import {Roles} from "./helpers/roles";
import jwtDecode from 'jwt-decode';

const TOKEN = 'token';

class UserStore {
    @observable id: string | undefined;
    @observable name = '';
    @observable email = "";
    @observable password = "";
    @observable role = '';
    @observable basket = [];

    constructor() {
        const accessToken  = this.getAuthTokens();

        if (accessToken) {
            this.init(accessToken);
        }

    }

    @action
    init(token: string) {
        const authData = jwtDecode(token);

        this.name = authData.name;
        this.role = authData.role;

        console.log("init user");
        console.log(authData);
    }

    getAuthTokens = () => {
        return localStorage.getItem(TOKEN);
    };

    @computed
    get authenticated() {
        return Boolean(this.name);
    }

    @action.bound
    onChangeEmail(event) {
        this.email = event.target.value;
    }

    @action.bound
    onChangePassword(event) {
        this.password = event.target.value;
    }

    @action.bound
    async loginBuyer(event) {
        event.preventDefault();

        const buyer = {
            email: this.email,
            password: this.password
        };

        try {
            const response = await instance.post(URLS.loginBuyer, buyer);

            console.log("loginBuyer");
            console.log(buyer);
            console.log(response.data);

            localStorage.setItem(TOKEN, response.data);

            this.init(response.data);


        } catch (error) {
            console.log(error);
        }
    }

    // @action.bound
    // async initBuyer(id) {
    //     let responseBuyer = await getBuyerById(id);
    //
    //     this.role = Roles.buyer;
    //     this.name = responseBuyer.data.name;
    //     this.basket = responseBuyer.data.basket;
    // }

    @action.bound
    async logOutBuyer() {
        localStorage.removeItem(TOKEN);

        this.basket = [];
        this.name = '';
    }
}

export {
    UserStore, TOKEN
};
