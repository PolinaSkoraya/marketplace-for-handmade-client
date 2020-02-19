import {instance} from "./instance";
import {URLS} from "./urls";
import {TOKEN} from "../stores/LoginBuyerStore";

function getGoods() {
    return instance.get(URLS.goods, {
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    });
}

function getSellerById (id) {
    return instance.get(URLS.sellers + id);
}

function getGoodsOfSeller (id) {
    return instance.get(URLS.sellers + id + "/goods");
}

function getGoodById (id) {
    return instance.get(URLS.goods + id,{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    });
}

function getGoodWithSellerById (id) {
    return instance.get(URLS.goods + id + "/seller",{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    });
}

export {getGoods, getSellerById, getGoodsOfSeller, getGoodById, getGoodWithSellerById};
