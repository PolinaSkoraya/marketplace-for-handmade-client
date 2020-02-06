import {action, observable} from 'mobx';
import {instance} from '../http/instance';
import {URLS} from '../http/urls';

class RegisterBuyerStore {
    @observable name = '';
    @observable email = '';
    @observable password = '';

    @action.bound
    onChangeName (event) {
        this.name = event.target.value;
    }

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
            name: this.name,
            email: this.email,
            password: this.password
        };

        try {
            const response = await instance.post(URLS.registerBuyer, buyer);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
}

export default RegisterBuyerStore;
