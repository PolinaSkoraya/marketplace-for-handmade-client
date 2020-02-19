import {action, observable} from 'mobx';
import {instance} from '../http/instance';
import {URLS} from '../http/urls';

const TOKEN = 'token';

class LoginBuyerStore {
    name = "";
    @observable email = "";
    @observable password = "";

    @action.bound
    onChangeEmail (event) {
        this.email = event.target.value;
    }

    @action.bound
    onChangePassword (event) {
        this.password = event.target.value;
    }

    @action.bound
    async onSubmit (event) {
        event.preventDefault();

        const buyer = {
            email: this.email,
            password: this.password
        }

        try {
            const response = await instance.post(URLS.loginBuyer, buyer);

            localStorage.setItem(TOKEN, response.data);

            console.log( localStorage.getItem(TOKEN));
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    LoginBuyerStore, TOKEN
};
