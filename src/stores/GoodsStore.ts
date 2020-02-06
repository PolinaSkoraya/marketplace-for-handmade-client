import {action} from 'mobx';
import {instance} from '../http/instance';
import {URLS} from '../http/urls';
import {TOKEN} from './LoginBuyerStore';

class GoodsStore {

    @action.bound
    async handleClick () {
        try {
            const response = await instance.get(URLS.goods, {
                headers: {
                    'auth-token': localStorage.getItem(TOKEN),
                },
            })

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}

export {GoodsStore}