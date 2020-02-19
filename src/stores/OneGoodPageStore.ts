import {action, observable} from 'mobx';
import {getGoodWithSellerById} from "../http/services";

class OneGoodPageStore {
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
    @observable likes = 0;

    @action.bound
    async initGood (id) {
        try {
            const responseGood = await getGoodWithSellerById(id);
            this.good = responseGood.data;

        } catch (error) {
            console.log(error);
        }
    }

}

export default OneGoodPageStore;